import React from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GoalItem = ({ goal, onDelete }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.textContainer}>
      <Pressable
        android_ripple={{ color: 'pink' }}
        onPress={() => navigation.navigate('Details', { goalObject: goal })}
        style={(pressed) => {
          console.log(pressed);
          return [styles.horizontalContainer, pressed && styles.pressedStyle];
        }}
      >
        <Text style={styles.textStyle}>{goal.text}</Text>
        <Button title="X" onPress={() => deleteHandler(goal.id)} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: 'grey',
    borderRadius: 10,
    borderWidth: 2,
    padding: 5,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textStyle: {
    color: 'darkmagenta',
    padding: 10,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'grey',
    alignItems: 'center',
    padding: 10, 
  },
  pressedStyle: {
    opacity: 0.5,
    backgroundColor: 'red',
  }
});

export default GoalItem;
