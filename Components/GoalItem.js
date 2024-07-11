import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GoalItem = ({ goal, onDelete }) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.textStyle}>{goal.text}</Text>
      <Button title="X" color="black" onPress={() => onDelete(goal.id)} />
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
});

export default GoalItem;