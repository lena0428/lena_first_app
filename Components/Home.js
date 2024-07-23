import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, SafeAreaView, ScrollView, FlatList } from 'react-native';
import Header from './Header';
import Input from './Input';
import { useState } from 'react';
import GoalItem from './GoalItem';
import PressableButton from './PressableButton';
import { database } from '../Firebase/firebaseSetup';
import { writeToDB } from '../Firebase/firestoreHelper';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { deleteFromDB } from '../Firebase/firestoreHelper';

export default function Home() {
  console.log(database)
  const appName = "lena_first_app";
  const [receivedText, setReceivedText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  useEffect(() => {
    onSnapshot(collection(database, 'goals'), (querySnapshot) => {
      let newArray = []
      // querySnapshot contains bunch of documents
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          console.log(doc.id);
          newArray.push({...doc.data(), id: doc.id});
        });
      }
      setGoals(newArray);
    });
    // detach the listener when we no longer need to listen to the changes in data.
    return () => unsubscribe(); 
  }, []);


  // Callback function to handle the received data
  function handleInputData(data) {
    console.log('Callback function called with:', data);
    const newGoal = {
      text: data,
    };
    setGoals((currentGoals) => [...currentGoals, newGoal]);
    // call write to DB function
    writeToDB(newGoal, 'goals');
    setReceivedText(data);
    setModalVisible(false);
  }

  // Callback function to handle the deletion of a goal
  const handleDeleteGoal = (goalId) => {
    // setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== goalId));
    // call detele from DB function
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
