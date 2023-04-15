import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import LinearGradient from 'react-native-linear-gradient';
import {useEffect} from 'react'

PushNotification.configure({
  onNotification: function(notification) {
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

export default function NotificationScreen() {

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

  const sendNotification = () => {
    PushNotification.localNotification({
      channelId: 'my-channel',
      title: 'Welcome to Nordstone',
      message: 'Assignment by Soumili ✅',
      soundName: 'default',
    });
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#2196f3']}
      style={styles.container}
    >
      <TouchableOpacity style={styles.button} onPress={sendNotification}>
        <Text style={styles.buttonText}>Send Notification</Text>
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
});