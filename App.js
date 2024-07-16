import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home Page',
            headerStyle: {
              backgroundColor: 'darkmagenta',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen name="Details" component={GoalDetails} options={({ navigation, route }) => { return { title: route.params?.goalObject.text, headerRight: () => { return <Button title='Warning' onPress={() => { console.log('Warning') }}></Button> } } }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
