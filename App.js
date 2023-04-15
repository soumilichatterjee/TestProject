import React from 'react';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useState, useEffect} from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import NotificationScreen from './screens/NotificationScreen';
import CalculatorScreen from './screens/CalculatorScreen';
import PhotoScreen from './screens/PhotoScreen';
import TextScreen from './screens/TextScreen';
import SignUpScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';

import {auth} from './screens/ImageFetchingFromBackend/firebaseConfig';

enableScreens();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        setIsAuth(!!user);
        setIsLoading(false);
      });

      return () => {
        unsubscribe();
      };
    }, 2000);
    return () => {
      clearTimeout(delay);
    };
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuth ? 'Home' : 'Welcome'}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{title: 'Sign Up'}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Home'}}
        />
        <Stack.Screen
          name="Calculator"
          component={CalculatorScreen}
          options={{title: 'Calculator'}}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{title: 'Notification'}}
        />
        <Stack.Screen
          name="Photo"
          component={PhotoScreen}
          options={{title: 'Photo'}}
        />
        <Stack.Screen
          name="Text"
          component={TextScreen}
          options={{title: 'Text'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
