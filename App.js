import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import { auth } from './Firebase/firebaseSetup';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import Map from './Components/Map';
import * as Notifications from 'expo-notifications';
import { Linking } from 'react-native';

const Stack = createNativeStackNavigator();

// Set the notification handler to present notifications
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    };
  },
  handleSuccess: (notificationId) => {
    console.log(`Notification ${notificationId} handled successfully.`);
  },
  handleError: (notificationId, error) => {
    console.error(`Error handling notification ${notificationId}:`, error);
  },
});

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthState = () => {
      onAuthStateChanged(auth, (user) => {
        setIsLoggedIn(!!user);
      });
    };

    checkAuthState();

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
      Linking.openURL(response.notification.request.content.data.url);
    });

    return () => {
      subscription.remove();
    };
  } , []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Signup">
    <Stack.Screen name="Signup" component={Signup} options={() => ({
      headerStyle: { backgroundColor: 'darkmagenta' },
    })} />
    <Stack.Screen name="Login" component={Login} options={() => ({
      headerStyle: { backgroundColor: 'darkmagenta' },
    })} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => ({
        title: 'All My Goals',
        headerStyle: { backgroundColor: 'darkmagenta' },
        headerRight: () => (
          <Ionicons
            name="person-circle-outline"
            size={30}
            color="white"
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate('Profile')}
          />
        ),
      })}
    />
    <Stack.Screen
      name="Details"
      component={GoalDetails}
      options={({ route }) => ({
        headerStyle: { backgroundColor: 'darkmagenta' },
        title: route.params?.goalObject.text,
      })}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={({ navigation }) => ({
        title: 'Profile',
        headerStyle: { backgroundColor: 'darkmagenta' },
        headerRight: () => (
          <Ionicons
            name="log-out"
            size={30}
            color="white"
            style={{ marginRight: 15 }}
            onPress={async () => {
              try {
                await signOut(auth);
                navigation.replace('Login');
              } catch (error) {
                console.error('Error signing out: ', error);
              }
            }}
          />
        )
      })
      }
    />
    <Stack.Screen
      name="Map"
      component={Map}
      options={{
        title: 'Map',
      }}
    />
  </Stack.Navigator>
);
