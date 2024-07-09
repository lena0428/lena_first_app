import { TextInput, Text, Button } from 'react-native'
import React from 'react'
import { useState } from 'react';

// update Input to receive a prop
const Input = ({inputHandler}) => {
    const [isBlurred, setIsBlurred] = useState(false);
    const [text, setText] = useState('');
    function handleConfirm() {
        console.log('user type:', text);
        // call the received prop callback fn
        inputHandler(text);
    }
    return (
        <>
            <TextInput
                style={{ height: 40 }}
                placeholder="Type here to translate!"
                onChangeText={(newText) => {
                    setText(newText);
                    if (isBlurred) {
                        setIsBlurred(false);
                    }
                }}
                onBlur={() => setIsBlurred(true)}
                onFocus={() => setIsBlurred(false)}
                value={text}>
            </TextInput>
            {isBlurred && <Text>Thank you</Text>}
            <Button title='Confirm' onPress={handleConfirm}>Confirm</Button>
        </>
    )
}

export default Input