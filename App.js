import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()
console.log(Stack)
export default function App() {
  return (<NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={GoalDetails} />
    </Stack.Navigator>
  </NavigationContainer>)
} 