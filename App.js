import React from 'react';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useState, useEffect} from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import NotificationScreen from './screens/NotificationScreen';
import CalculatorScreen from './screens/CalculatorScreen';
import PhotoScreen from './screens/PhotoScreen';
import TextScreen from './screens/TextScreen';
import SignUpScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';
import {auth} from './screens/ImageFetchingFromBackend/firebaseConfig';
import FontAwesome from 'react-native-vector-icons/FontAwesome'



enableScreens();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthAppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#2196f3',
        tabBarInactiveTintColor: 'black',
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Notification') {
            iconName = focused ? 'bell' : 'bell-o';
          } else if (route.name === 'Photo') {
            iconName = focused ? 'camera' : 'camera';
          } else if (route.name === 'Text') {
            iconName = focused ? 'file-text' : 'file-text-o';
          } else if (route.name === 'Calculator') {
            iconName = focused ? 'calculator' : 'calculator';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarLabel: () => null,
      })}
    >
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Photo" component={PhotoScreen} />
      <Tab.Screen name="Text" component={TextScreen} />
      <Tab.Screen name="Calculator" component={CalculatorScreen} />
    </Tab.Navigator>
  );
}


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

  function renderTabs() {
    if (isAuth) {
      return <Stack.Screen name="AuthAppTabs" component={AuthAppTabs} options={{headerShown: false}} />;
    } else {
      return (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{title: 'Sign Up'}} />
          <Stack.Screen name="Login" component={LoginScreen} options={{title: 'Login'}} />
        </>
      );
    }
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {renderTabs()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}