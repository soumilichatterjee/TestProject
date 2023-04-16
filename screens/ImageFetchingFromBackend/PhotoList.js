import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {db} from './firebaseConfig';

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection('photos')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const updatedPhotos = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPhotos(updatedPhotos);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      {photos.map(photo => (
        <Image
          key={photo.id}
          source={{uri: photo.downloadURL}}
          style={styles.image}
        />
      ))}
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
});

export default PhotoList;
