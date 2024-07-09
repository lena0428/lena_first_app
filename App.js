import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';
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
    <View style={styles.container}>
      {/* use a prop to pass appName to Header */}
      <Header app_name={appName} theme="dark">
        {/* <Text>Children1</Text>
      <Text>Children2</Text> */}
      </Header>
      <Input inputHandler={handleInputData} isModalVisible={modalVisible} />
      <Text>Received: {receivedText}</Text>
      <Button title='Add a goal' onPress={() => setModalVisible(true)} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
