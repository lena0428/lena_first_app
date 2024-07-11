import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, SafeAreaView, ScrollView } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input';
import { useState } from 'react';

export default function App() {
  const appName = "lena_first_app";
  const [receivedText, setReceivedText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  // Callback function to handle the received data
  function handleInputData(data) {
    console.log('Callback function called with:', data);
    // define a new object with the received data
    // set the text property of the object to the received data
    // set the id property with a random number between 0 and 1
    const newGoal = {
      text: data,
      id: Math.random(),
    };
    // add this object to goals array, updater function is used to get the current state of the goals
    setGoals((currentGoals) => [...currentGoals, newGoal]);
    setReceivedText(data);
    setModalVisible(false);
  }

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
        <Button title='Add a goal' onPress={() => setModalVisible(true)} />
      </View>
      <Input
        inputHandler={handleInputData}
        isModalVisible={modalVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <View style={styles.bottomContainer}>
        {/* array map */}
        {goals.length === 0 ? (
          <Text style={styles.textStyle}>Please Add a Goal</Text>
        ) : (
          <ScrollView horizontal={true}>
            {goals.map((goal) => {
              console.log(goal);
              return (
                <View key={goal.id} style={styles.textContainer}>
                  <Text style={styles.textStyle}>{goal.text}</Text>
                </View>
              );
            })}
          </ScrollView>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>Received: {receivedText}</Text>
        </View>
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
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: '#B19CD9',
    alignItems: 'center',
    rowGap: 10,
  }
});
