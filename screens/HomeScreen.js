import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "./ImageFetchingFromBackend/firebaseConfig";

export default function HomeScreen({ route,navigation }) {
  const { userName } = route.params;
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
        });
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };
  
  return (
    <View
      style={{
        flex: -1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
    <Text style={styles.greeting}>Hello, {userName}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Calculator")} style={styles.button}>
        <Text style={styles.menu}>🧠 Go to Calculator Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Notification")} style={styles.button}>
        <Text style={styles.menu}>🔔 Go to Notifiation Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Photo")} style={styles.button}>
        <Text style={styles.menu}>📸 Go to Photos Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Text")} style={styles.button}>
        <Text style={styles.menu}>✏️ Go to Text Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}> Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  greeting: {
    fontSize: 20,
    marginBottom: 16,
    marginTop:30,
    color:'black',
  },
  menu: {
    fontSize: 18,
    color: 'white'
  },
button:{
  backgroundColor: "#2196f3",
  padding: 15,
  borderRadius: 5,
  alignItems: "center",
  width: "80%",
  marginTop: 20,
},
logoutButton: {
  padding: 10,
  borderRadius: 5,
  alignItems: "center",
  width: "50%",
  marginTop: 40,
},
logoutText: {
  fontSize: 20,
  color: "red",
},
});