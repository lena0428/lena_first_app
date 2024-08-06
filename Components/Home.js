import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, SafeAreaView, FlatList } from 'react-native';
import Header from './Header';
import Input from './Input';
import { useState, useEffect } from 'react';
import GoalItem from './GoalItem';
import PressableButton from './PressableButton';
import { getAuth } from "firebase/auth";
import { database, storage } from '../Firebase/firebaseSetup';
import { writeToDB, deleteFromDB } from '../Firebase/firestoreHelper';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytesResumable } from "firebase/storage";

export default function Home() {
  const appName = "lena_first_app";
  const [receivedText, setReceivedText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;


    if (currentUser) {
      const goalsQuery = query(
        collection(database, "goals"),
        where("owner", "==", currentUser.uid)
      );

      const unsubscribe = onSnapshot(
        goalsQuery,
        (querySnapshot) => {
          let newArray = [];
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              console.log(doc.id);
              newArray.push({ ...doc.data(), id: doc.id });
            });
          }
          setGoals(newArray);
        },
        (error) => {
          console.error("Error fetching goals: ", error);
          if (error.code === "permission-denied") {
            console.error("Permission denied. Please check your security rules.");
          }
        }
      );

      return () => unsubscribe();
    }
  }, []);

  async function handleInputData(data) {
    console.log('Callback function called with:', data);
    let newGoal = { text: data.text };

    if (data.imageUri) {
      await handleImageUpload(data.imageUri);
    }

    setGoals((currentGoals) => [...currentGoals, newGoal]);
    writeToDB(newGoal, 'goals');
    setReceivedText(data.text);
    setModalVisible(false);

    async function handleImageUpload(imageUri) {
      try {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const imageName = data.imageUri.substring(imageUri.lastIndexOf('/') + 1);
        const imageRef = ref(storage, `images/${imageName}`);
        const uploadResult = await uploadBytesResumable(imageRef, blob);
        newGoal.imageUri = uploadResult.metadata.fullPath;
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  }

  const handleDeleteGoal = (goalId) => {
    deleteFromDB(goalId, 'goals');
  };

  const handleConfirm = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Header app_name={appName} theme="dark" />
        <PressableButton
          pressFuction={() => setModalVisible(true)}
          componentStyle={styles.buttonStyle}
        >
          <Text style={styles.subtilte}>
            Add a goal
          </Text>
        </PressableButton>
      </View>
      <Input
        inputHandler={handleInputData}
        isModalVisible={modalVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <View style={styles.bottomContainer}>
        {goals.length === 0 ? (
          <Text style={styles.textStyle}>Please Add a Goal</Text>
        ) : (
          <FlatList renderItem={({ item }) => {
            console.log(item)
            return (
              <GoalItem goal={item} onDelete={handleDeleteGoal} />
            )
          }} data={goals}>
          </FlatList>
        )}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'darkmagenta',
    padding: 10,
  },
  textContainer: {
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 5,
  },
  topContainer: {
    flex: 1.5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 5,
    backgroundColor: '#B19CD9',
    alignItems: 'center',
    rowGap: 10,
  },
  buttonStyle: {
    boarderRadius: 10,
    padding: 10,
    margin: 10,
  },
  subtilte: {
    color: 'purple',
    fontSize: 20,
    margin: 10,
    borderRadius: 20,
  },
});
