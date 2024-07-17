import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();

const headerStyle = {
  backgroundColor: 'darkmagenta',
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home Page',
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen name="Details" component={GoalDetails} options={({ navigation, route }) => {
          return { headerStyle: headerStyle, title: route.params?.goalObject.text }
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
