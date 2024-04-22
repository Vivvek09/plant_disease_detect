import React, { useState, useEffect } from 'react';
import { View, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import { ScrollView } from 'react-native';


export default function ScanPage() {
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
    if (!result.canceled) {
      setImage({ uri: result.assets[0].uri });
    }
  };

  const takePhoto = async () => {
    if (!cameraPermission) {
      Alert.alert('Permission denied', 'You need to enable permission to access the camera');
      return;
    }

    const photo = await ImagePicker.launchCameraAsync();
    if (!photo.canceled) {
      setImage({ uri: photo.assets[0].uri });
    }
  };

  const diagnoseDisease = () => {
    // Implement your diagnosis logic here
    Alert.alert('Diagnosis', 'This feature is under development.');
  };

  return (
    <SafeAreaView style={{height:'100%', padding:40}}>
      <ScrollView>
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Image source={image} style={{ width: 300, height: 300, marginBottom: 20, borderRadius:20 }} />
      <View style={{justifyContent:'space-between', flexDirection:'row', width:'100%', paddingBottom:20}}>
      <Button title="Upload Image" icon="image" onPress={pickImage} />
      <Button title="Take Photo" icon="camera" onPress={takePhoto} />
      </View>
      <Button title="Diagnose Disease" onPress={diagnoseDisease} />
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}
