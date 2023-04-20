import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {auth} from './ImageFetchingFromBackend/firebaseConfig';
import {useNavigation} from '@react-navigation/native';

const SignUpScreen = ({navigation}) => {
  const nav = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [passwordFormat, setPasswordFormat] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEmailValid(email === '' ? null : email.includes('@'));
  }, [email]);

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPasswordValid(password === '' ? null : passwordRegex.test(password));
    if (password.length > 0 && !passwordValid) {
      setPasswordFormat('Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character.');
    } else {
      setPasswordFormat('');
    }
  }, [password]);

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      if (auth && emailValid && passwordValid) {
        const {user} = await auth.createUserWithEmailAndPassword(
          email,
          password,
        );
        await user.updateProfile({displayName: name});

        navigation.reset({
          index: 0,
          routes: [{ name: 'AuthAppTabs', params: { screen: 'Notification', params: { userName: user.displayName } } }],
        });
      } else {
        console.log('Firebase auth not initialized');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
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
      <Text style={styles.passwordFormat}>{passwordFormat}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {isLoading ? (
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Signing you up...</Text>
        </>
      ) : (
        <Button
          title="Sign Up"
          onPress={handleSignUp}
          disabled={emailValid !== true || passwordValid !== true}
        />
      )}
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
      loadingText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
      },
      passwordFormat: {
        marginBottom: 10,
        color: 'red',
        fontStyle: 'italic',
      },
    });
    
    export default SignUpScreen
    
