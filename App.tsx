import React from 'react';
import { StyleSheet, View } from 'react-native';

import TwitterLogin from './TwitterLogin';
import LinkedinLogin from './LinkedinLogin';
import GoogleLogin from './GoogleLogin';
import FacebookLogin from './FacebookLogin';

export default function App() {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <TwitterLogin />
      <LinkedinLogin />
      <GoogleLogin />
      <FacebookLogin />
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
