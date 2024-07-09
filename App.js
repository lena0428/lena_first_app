import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input';
import { useState } from 'react';


export default function App() {
  const appName = "lena_first_app";
  const [receivedText, setReceivedText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  // set callback function to handle the received data
  function handleInputData(data) {
    console.log('callback fn called with:', data);
    // set the receive data to the state
    setReceivedText(data);
    // hide the modal
    setModalVisible(false);
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* use a prop to pass appName to Header */}
      <View style={styles.topContainer}>
        <Header app_name={appName} theme="dark" />
        <Button title='Add a goal' onPress={() => setModalVisible(true)} />
      </View>
      {/* <Text>Children1</Text>
      <Text>Children2</Text> */}
      <Input inputHandler={handleInputData} isModalVisible={modalVisible} />
      <View style={styles.bottomContainer}><Text style={styles.textStyle}>Received: {receivedText}</Text></View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'darkmagenta',
  },
  topContainer: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
  },
  bottomContainer: { flex: 4, backgroundColor: 'lightblue', alignItems: 'center'}
});
