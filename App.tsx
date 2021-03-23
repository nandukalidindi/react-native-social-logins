import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';

import { WebView } from 'react-native-webview';
import { OAuth1 } from './auth';
import TwitterLogin from './TwitterLogin';
import LinkedinLogin from './LinkedinLogin';
import GoogleLogin from './GoogleLogin';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <TwitterLogin />
      <LinkedinLogin />
      <GoogleLogin />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
