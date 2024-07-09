import { TextInput, Text, StatusBar } from 'react-native'
import React from 'react'
import { useState } from 'react';


const Input = () => {
    const [isBlurred, setIsBlurred] = useState(false);
    const [text, setText] = useState('');
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
            <StatusBar style="auto" />
        </>
    )
}

export default Input