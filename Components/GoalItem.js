import React from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GoalItem = ({ goal, onDelete }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.textContainer}>
      <Pressable
        onPress={() => navigation.navigate('Details', { goalObject: goal })}
        style={styles.pressable}
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
  pressable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10, 
}
});

export default GoalItem;
