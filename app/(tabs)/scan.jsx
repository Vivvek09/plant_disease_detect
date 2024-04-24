import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import Button from '../../components/Button';
import { saveImageToDatabase, loadLatestImagesFromDatabase } from '../../constants/database';

const Scan = () => {
  const [image, setImage] = useState(require('../../assets/images/home.png'));
  const [cameraPermission, setCameraPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'You need to enable permission to access the library');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setImage({ uri: result.assets[0].uri });
    }
  };

  const takePhoto = async () => {
    if (!cameraPermission) {
      Alert.alert('Permission denied', 'You need to enable permission to access the camera');
      return;
    }

    const photo = await ImagePicker.launchCameraAsync();
    if (!photo.cancelled) {
      setImage({ uri: photo.assets[0].uri });
    }
  };

  const onDiagnose = async (imageUri) => {
    try {
      const imagePath = await saveImageToDatabase(imageUri); // Save the image to the database
      console.log('Image saved to database:', imagePath);
      // Implement any additional logic here after saving to the database
    } catch (error) {
      console.error('Error saving image to database:', error);
      Alert.alert('Error', 'Failed to save image to database.');
    }
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 40 }}>
        <Image source={image} style={{ width: 300, height: 300, marginBottom: 20, borderRadius: 20 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 }}>
          <Button title="Upload Image" icon="image" onPress={pickImage} />
          <Button title="Take Photo" icon="camera" onPress={takePhoto} />
        </View>
        <Button title="Diagnose Disease" onPress={() => onDiagnose(image.uri)} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Scan;
