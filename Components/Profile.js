import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth } from '../Firebase/firebaseSetup';
import { signOut } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';

const Profile = ({ navigation }) => {
  const user = auth.currentUser;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login'); 
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="log-out-outline"
          size={30}
          color="white"
          style={{ marginRight: 15 }}
          onPress={handleSignOut}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email: {user?.email}</Text>
      <Text style={styles.text}>UID: {user?.uid}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Profile;
