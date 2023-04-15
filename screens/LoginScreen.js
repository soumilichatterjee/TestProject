import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity  } from "react-native";
import {auth } from "./ImageFetchingFromBackend/firebaseConfig";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const handleLogin = async () => {
  //   try {
  //     const { user } = await auth.signInWithEmailAndPassword(email, password);
  //     navigation.navigate("Home", { userName: user.displayName });
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };
  const handleLogin = async () => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home', params: { userName: user.displayName } }],
      });
    } catch (error) {
      setError(error.message);
    }
  };
  

  const handleForgotPassword = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordButton}>
      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: "blue",
    textAlign: "center",
  },
});

export default LoginScreen;