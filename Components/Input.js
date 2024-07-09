import { StyleSheet, TextInput, Text, Button, View, Modal } from 'react-native'
import React from 'react'
import { useState } from 'react';

// update Input to receive a prop
const Input = (props) => {
    const [isBlurred, setIsBlurred] = useState(false);
    const [text, setText] = useState('');
    function handleConfirm() {
        console.log('user type:', text);
        // call the received prop callback fn
        props.inputHandler(text);
    }
    return (
        <Modal animationType='slide' visible={props.isModalVisible}>
            <View style={styles.container}>
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
            </View >
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Input