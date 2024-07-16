import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, SafeAreaView, ScrollView, FlatList } from 'react-native';
import Header from './Header';
import Input from './Input';
import { useState } from 'react';
import GoalItem from './GoalItem';

export default function Home({ navigation }) {
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

  // Callback function to handle the deletion of a goal
  const handleDeleteGoal = (goalId) => {
    setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== goalId));
  };

  function handlePressGoalDetails(pressedGoal) {
    console.log(pressedGoal);
    navigation.navigate('Details', { goalObject: pressedGoal });
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
          // because we don't do the manual mapping, we don't need the unique key for each item, react native does it for us
          <FlatList renderItem={({ item }) => {
            return (
              <GoalItem goal={item} onDelete={handleDeleteGoal} handlePressGoalDetails={handlePressGoalDetails} />)
          }} data={goals}>
          </FlatList>
          // <ScrollView>
          //   {goals.map((goal) => {
          //     console.log(goal);
          //     return (
          //       <View key={goal.id} style={styles.textContainer}>
          //         <Text style={styles.textStyle}>{goal.text}</Text>
          //       </View>
          //     );
          //   })}
          // </ScrollView>
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
