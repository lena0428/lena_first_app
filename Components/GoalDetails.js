import React, { useLayoutEffect, useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from '../Firebase/firebaseSetup'; 

export default function GoalDetails({ navigation, route }) {
    const [textColor, setTextColor] = useState('black');
    const [headerTitle, setHeaderTitle] = useState(route.params?.goalObject.text);
    const [imageUrl, setImageUrl] = useState(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: headerTitle,
            headerRight: () => (
                <Button
                    title="Warning"
                    onPress={() => {
                        setTextColor('red');
                        setHeaderTitle('Warning!');
                    }}
                />
            ),
        });
    }, [navigation, headerTitle]);

    useEffect(() => {
        const fetchImageUrl = async () => {
            if (route.params?.goalObject.imageUri) {
                try {
                    const imageRef = ref(storage, route.params.goalObject.imageUri);
                    const url = await getDownloadURL(imageRef);
                    setImageUrl(url);
                    console.log(url)
                } catch (error) {
                    console.error('Error fetching image URL:', error);
                }
            }
        };

        fetchImageUrl();
    }, [route.params?.goalObject.imageUri]);

    return (
        <View style={styles.container}>
            {route.params ? (
                <Text style={{ color: textColor }}>
                    GoalDetails of {route.params.goalObject.text} with id of {route.params.goalObject.id}
                </Text>
            ) : (
                <Text style={{ color: textColor }}>More Details</Text>
            )}
            {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
            <Button title="More details" onPress={() => navigation.push('Details')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
});
