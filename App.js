import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text} from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input';
import { useState } from 'react';


export default function App() {
  const appName = "lena_first_app";
  const [receivedText, setReceivedText] = useState('');
  function handleInputData(data) {
    console.log('callback fn called with:', data);
    setReceivedText(data);
  }
  return (
    <View style={styles.container}>
      {/* use a prop to pass appName to Header */}
      <Header app_name = {appName} theme="dark"> 
      {/* <Text>Children1</Text>
      <Text>Children2</Text> */}
      </Header>
      <Input inputHandler = {handleInputData}/>
      <Text>Received: {receivedText}</Text>
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
