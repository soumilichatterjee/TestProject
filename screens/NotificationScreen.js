import {StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import React, {useState, useCallback} from 'react';
import {auth} from './ImageFetchingFromBackend/firebaseConfig';
import PushNotification from 'react-native-push-notification';
import LinearGradient from 'react-native-linear-gradient';
import {useEffect} from 'react';

PushNotification.configure({
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

export default function NotificationScreen({route}) {

  const {userName} = route.params ?? {};
  const [sendingNotification, setSendingNotification] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'my-channel',
          channelName: 'My Channel',
          importance: PushNotification.Importance.HIGH,
        },
        (created) => console.log(`createChannel returned '${created}'`),
      );
    }
  }, []);

  const sendNotification = useCallback(() => {
    setSendingNotification(true);
    PushNotification.localNotification({
      channelId: 'my-channel',
      title: 'Welcome to Nordstone',
      message: 'Assignment by Soumili ✅',
      soundName: 'default',
    });
    setTimeout(() => {
      setSendingNotification(false);
    }, 2000);
  }, []);

  return (
    <LinearGradient colors={['#4c669f', '#2196f3']} style={styles.container}>
      <Text style={styles.welcomeText}>Hello, {userName}!</Text>
      <TouchableOpacity style={styles.button} onPress={sendNotification}>
        {sendingNotification ? (
          <Text style={styles.buttonText}>Sending Notification...</Text>
        ) : (
          <Text style={styles.buttonText}>Send Notification</Text>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#192f6a',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
});