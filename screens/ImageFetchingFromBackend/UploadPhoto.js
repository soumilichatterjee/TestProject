import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { db, storage } from "./firebaseConfig";
import * as ImagePicker from "react-native-image-picker";

const UploadPhoto = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [imageSelected, setImageSelected] = useState(false);

  const handleChange = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      allowsEditing: true,
    };
  
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        setImage(source);
        setImageSelected(true);
      }
    });
  };
  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }

    const storageRef = storage.ref();

    const timestamp = new Date().getTime();
    const fileExtension = image.uri.split(".").pop();
    const fileName = `${timestamp}.${fileExtension}`;
    const fileRef = storageRef.child(fileName);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const uploadTask = fileRef.put(blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        setError(error.message);
      },
      async () => {
        const downloadURL = await fileRef.getDownloadURL();
        const createdAt = new Date().toISOString();
        db.collection("photos").add({ downloadURL, createdAt });
        setImage(null);
        setProgress(0);
        setImageSelected(false);
      }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleChange}
        style={[
          styles.buttonChoose,
          imageSelected ? styles.buttonDisabled : {},
        ]}
        disabled={imageSelected}
      >
        <Text style={styles.buttonChooseText}>Choose Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleUpload} style={styles.button}>
        <Text style={styles.buttonText}>Upload Photo</Text>
      </TouchableOpacity>

      {error && <Text>{error}</Text>}
      {progress > 0 && <Text style={{ margin: 10 }}>{progress}% uploaded</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  buttonChoose: {
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "black",
  },

  buttonChooseText: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Helvetica Neue",
  },

  button: {
    backgroundColor: "#2196f3",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30
  },

  buttonDisabled: {
    backgroundColor: "#8a9094",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Helvetica Neue",
  },
});
export default UploadPhoto;