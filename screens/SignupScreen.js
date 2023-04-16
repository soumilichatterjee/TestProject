import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {auth} from './ImageFetchingFromBackend/firebaseConfig';
const SignUpScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);

  useEffect(() => {
    setEmailValid(email === '' ? null : email.includes('@'));
  }, [email]);

  useEffect(() => {
    setPasswordValid(password === '' ? null : password.length >= 6);
  }, [password]);

  const handleSignUp = async () => {
    try {
      if (auth && emailValid && passwordValid) {
        const {user} = await auth.createUserWithEmailAndPassword(
          email,
          password,
        );
        await user.updateProfile({displayName: name});

        navigation.reset({
          index: 0,
          routes: [{name: 'Home', params: {userName: name}}],
        });
      } else {
        console.log('Firebase auth not initialized');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Name"
      />
      <TextInput
        style={[
          styles.input,
          emailValid === false && styles.invalid,
          emailValid === true && styles.valid,
        ]}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[
          styles.input,
          passwordValid === false && styles.invalid,
          passwordValid === true && styles.valid,
        ]}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        title="Sign Up"
        onPress={handleSignUp}
        disabled={emailValid !== true || passwordValid !== true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  invalid: {
    borderColor: 'red',
  },
  valid: {
    borderColor: 'green',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignUpScreen;
