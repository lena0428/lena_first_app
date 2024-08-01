import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const Header = (props) => {
  const { width, height } = Dimensions.get('window');
  return (
    <View>
      <Text style = {styles.headerStyle}>Welcome to {props.app_name}</Text>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 30,
    borderColor: 'purple',
    borderWidth: 2,
    margin: 15,
    padding: 10,
  }
})

export default Header