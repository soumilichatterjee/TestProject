import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { db } from './firebaseConfig';

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = db
      .collection('photos')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        snapshot => {
          const updatedPhotos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPhotos(updatedPhotos);
          setError(null);
        },
        error => {
          console.log('Error fetching photos:', error);
          setError('Error fetching photos. Please check your internet connection.');
        }
      );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {photos.map(
        photo =>
          photo.downloadURL && (
            <Image key={photo.id} source={{ uri: photo.downloadURL }} style={styles.image} />
          )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: 120,
    height: 120,
    margin: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default PhotoList;
