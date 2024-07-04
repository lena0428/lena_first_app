import { TextInput } from 'react-native'
import React from 'react'

const Input = () => {
  const [text, setText] = useState('');
  return (
   <>
    <TextInput
    style = {{height: 40}}
      placeholder="Type here to translate!"
      onChangeText={newText => {
        setText(newText);
        console.log(text) // this is not updated!
      }}
      value={text}>
    </TextInput>
    <Text>{text}</Text>
    <StatusBar style="auto" />
    </>
  )
}

export default Header