import { View, Text } from 'react-native'
import React from 'react'

const Header = (props) => {
  return (
    <View>
      <Text>Welcome to {props.app_name}</Text>
      {props.children}
    </View>
  )
}

export default Header