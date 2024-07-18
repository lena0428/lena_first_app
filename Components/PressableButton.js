import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const PressableButton = ({ children, pressFuction, componentStyle }) => {
    return (
        <View>
            <Pressable
                onPress={() => pressFuction()}
                style={({ pressed }) => {
                    console.log(pressed);
                    return [
                        styles.defaultStyle,
                        componentStyle,
                        pressed && styles.pressedStyle];
                }}
            >
                <Text>{children}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    pressedStyle: {
        opacity: 0.5,
        backgroundColor: 'red',
        padding: 10,
    },
    defaultStyle: {
        padding: 10,
        margin: 10,
        backgroundColor: 'beige',
    },
});

export default PressableButton;