import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <View style={{flex: 0.5}}>
      <WebView source={{ uri: 'https://reactnative.dev/' }} />
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
