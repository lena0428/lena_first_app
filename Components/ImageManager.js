import React, { useState } from 'react';
import { View, Button, Alert, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImageManager = ({ onImageTaken }) => {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState(null);

  const verifyPermission = async () => {
    if (status?.granted) {
      return true;
    } else {
      const { granted } = await requestPermission();
      return granted;
    }
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert('Permission required', 'Camera permission is required to take images.');
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });

      if (!result.canceled) {
        const { assets } = result;
        const uri = assets[0].uri;
        setImageUri(uri);
        onImageTaken(uri); // Pass the image URI to the parent component
      } else {
        Alert.alert('Cancelled', 'Image picking was cancelled');
      }
    } catch (err) {
      Alert.alert('Error', 'An error occurred while taking the image');
    }
  };

  return (
    <View>
      <Button title="Take Image" onPress={takeImageHandler} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default ImageManager;
