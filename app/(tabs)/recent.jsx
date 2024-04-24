import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, Alert, Text } from 'react-native'; // Import Text component
import { SafeAreaView } from 'react-native-safe-area-context';
import { loadLatestImagesFromDatabase } from '../../constants/database';
import Button from '../../components/Button';

const Recent = ({ onDiagnoseProp }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadLatestImages();
  }, []);

  const loadLatestImages = async () => {
    try {
      const latestImages = await loadLatestImagesFromDatabase(5);
      setImages(latestImages);
    } catch (error) {
      console.error('Error loading latest images from database:', error);
      Alert.alert('Error', 'Failed to load latest images from database.');
    }
  };

  const deleteAllImages = async () => {
    try {
      await deleteAllImagesFromDatabase();
      setImages([]);
      Alert.alert('Success', 'All images have been deleted from the database.');
    } catch (error) {
      console.error('Error deleting images from database:', error);
      Alert.alert('Error', 'Failed to delete images from database.');
    }
  };

  const onDiagnose = async () => {
    try {
      await onDiagnoseProp();
      await loadLatestImages();
    } catch (error) {
      console.error('Error during diagnosis:', error);
      Alert.alert('Error', 'Failed to perform diagnosis.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 40 }}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={{ width: 300, height: 300, marginBottom: 20, borderRadius: 20 }} />
        ))}
      </ScrollView>
      <Button title="Refresh Images" onPress={loadLatestImages} />
      <Button title="Delete All Images" onPress={deleteAllImages} />
    </SafeAreaView>
  );
};

export default Recent;
