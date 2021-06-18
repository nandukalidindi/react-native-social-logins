import * as React from 'react'
import { View, StyleSheet, Modal, TouchableOpacity, Image, Text } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { WebView } from 'react-native-webview';
import LinkedinAuth from './auth/LinkedinAuth';

import { LINKEDIN_CLIENTID, LINKEDIN_CLIENTSECRET, LINKEDIN_CALLBACK_URI } from "@env"

export default function LinkedinLogin(props: any): JSX.Element {

  let timeoutId: number = -1;

  const [state, setState] = React.useState({ visible: false, url: "" });

  const onButtonClick = (event: any) => {
    setState({ visible: true, url: OAuth2Consumer.getAuthorizationUrl() });
  }

  const onNavigationStateChange = ({ url }: any) => {
    if (url.includes(OAuth2Consumer.config.redirectUri)) {

      const code = OAuth2Consumer.getAuthorizationCode(url);

      OAuth2Consumer.getAccessToken(code)
        .then(response => {
          const { access_token, expires_in } = response;

          if (!access_token) return;

          setState({ visible: false, url: '' });

          OAuth2Consumer.getUserDetails(access_token)
            .then(response => {
              console.log(response);
            });
        })
    }
  }

  const OAuth2Consumer = new LinkedinAuth({
    clientId: LINKEDIN_CLIENTID,
    clientSecret: LINKEDIN_CLIENTSECRET,
    authorizationUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    accessTokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
    redirectUri: LINKEDIN_CALLBACK_URI
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={onButtonClick}>
        <AntDesign name="linkedin-square" size={30} color="black" />
      </TouchableOpacity>
      <Modal
        transparent
        visible={state.visible}
      >
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <WebView
              source={{ uri: state.url }}
              style={{ flex: 1 }}
              javaScriptEnabled={true}
              startInLoadingState
              onNavigationStateChange={onNavigationStateChange}
            />
          </View>
          <TouchableOpacity
            onPress={() => setState({ ...state, visible: false })}
            style={styles.close}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 40,
    paddingHorizontal: 10,
  },
  wrapper: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 10,
    borderColor: 'rgba(0, 0, 0, 0.6)',
  },
  close: {
    position: 'absolute',
    top: 35,
    right: 5,
    backgroundColor: '#000',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24
  }
})

