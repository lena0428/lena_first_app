import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input';
import { useState } from 'react';

export default function App() {
  const appName = "lena_first_app";
  const [receivedText, setReceivedText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Callback function to handle the received data
  function handleInputData(data) {
    console.log('Callback function called with:', data);
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
  }
});
