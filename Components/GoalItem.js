import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GoalItem = ({ goal }) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.textStyle}>{goal.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
  },
  textStyle: {
    color: 'darkmagenta',
    padding: 10,
  },
});

export default GoalItem;
