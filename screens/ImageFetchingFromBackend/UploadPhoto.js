import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import {db, storage} from './firebaseConfig';
import * as ImagePicker from 'react-native-image-picker';

const UploadPhoto = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [imageSelected, setImageSelected] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);

  const handleChange = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      allowsEditing: true,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.assets[0].uri};
        setImage(source);
        setImageSelected(true);
        setShowImagePreview(true);
      }
    });
  };

  const handleUpload = async () => {
    if (!image) {
      setError('Please select an image to upload.');
      return;
    }

    setUploading(true);

    const storageRef = storage.ref();

    const timestamp = new Date().getTime();
    const fileExtension = image.uri.split('.').pop();
    const fileName = `${timestamp}.${fileExtension}`;
    const fileRef = storageRef.child(fileName);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const uploadTask = fileRef.put(blob);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setProgress(progress);
      },
      error => {
        setError(error.message);
        setUploading(false);
      },
      async () => {
        const downloadURL = await fileRef.getDownloadURL();
        const createdAt = new Date().toISOString();
        db.collection('photos').add({downloadURL, createdAt});
        setImage(null);
        setProgress(0);
        setImageSelected(false);
        setShowImagePreview(false);
        setUploading(false);
      },
    );
  };

  const handleRemoveImage = () => {
    if(image){
    setImage(null);
    setShowImagePreview(false);
    setImageSelected(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleChange}
        style={[
          styles.buttonChoose,
          imageSelected ? styles.buttonDisabled : {},
        ]}
        disabled={imageSelected}>
        <Text style={styles.buttonChooseText}>Choose Photo</Text>
      </TouchableOpacity>
      {showImagePreview && (
        <View style={styles.imagePreviewContainer}>
          <Image
            source={image}
            style={styles.imagePreview}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleRemoveImage}>
            <Image
              source={{
                uri: 'https://freeiconshop.com/wp-content/uploads/edd/cross-flat.png',
              }}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity onPress={handleUpload} style={styles.button}>
        <Text style={styles.buttonText}>
          {uploading ? 'Uploading Photo' : 'Upload Photo'}
        </Text>
      </TouchableOpacity>
      {uploading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color="#2196f3" />
          <Text style={styles.uploadingText}>Uploading...</Text>
        </View>
      )}
      {error && <Text>{error}</Text>}
      {progress > 0 && <Text style={{margin: 10}}>{progress}% uploaded</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonChoose: {
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: 'black',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2196f3',
    marginBottom: 20,
    marginTop: 20,
  },

  imagePreviewContainer: {
    position: 'relative',
    marginBottom: 20,
    marginTop: 20,
  },

  closeButton: {
    position: 'absolute',
    top: 10,
    right: -10,
  },

  closeIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  buttonChooseText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  buttonDisabled: {
    backgroundColor: '#8a9094',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
  },

  shortImageName: {
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    marginTop: 10,
    marginBottom: 10,
    color: '#333',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#2196f3',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },

  loaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  uploadingText: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
    color: '#2196f3',
  },
});

export default UploadPhoto;
