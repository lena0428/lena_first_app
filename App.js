import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Components/Login';
import Signup from './Components/Signup';

const Stack = createNativeStackNavigator();

const headerStyle = {
  backgroundColor: 'darkmagenta',
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Signup'>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
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
