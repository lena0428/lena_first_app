import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './Components/Header';

export default function App() {
  const appName = "lena_first_app";
  return (
    <View style={styles.container}>
      {/* use a prop to pass appName to Header */}
      <Header app_name = {appName} theme="dark"> 
      <Text>Children1</Text>
      <Text>Children2</Text>
      </Header>
      <Text>{appName}.</Text>
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
