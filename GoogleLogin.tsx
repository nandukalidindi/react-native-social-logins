import * as React from 'react'
import { View, StyleSheet, Modal, TouchableOpacity, Image, Text } from 'react-native';

import { WebView } from 'react-native-webview';
import GoogleAuth from './auth/GoogleAuth';

import {GOOGLE_CLIENTID, GOOGLE_CLIENTSECRET} from "@env"

export default function GoogleLogin(props: any): JSX.Element {

  let timeoutId: number = -1;

  const [ state, setState ] = React.useState({ visible: false, url: "" });

  const onButtonClick = (event: any) => {    
      setState({ visible: true, url: OAuth2Consumer.getAuthorizationUrl() });
  }

  const onNavigationStateChange = ({ url }: any) => {
    if(url.startsWith(OAuth2Consumer.config.redirectUri)) {

      const code = OAuth2Consumer.getAuthorizationCode(url);

      OAuth2Consumer.getAccessToken(decodeURIComponent(code))
        .then(response => {
          const { access_token, expires_in } = response;

          console.log("RESKMAD");
          console.log(response);

          if(!access_token) return;

          setState({ visible: false, url: '' });

          OAuth2Consumer.getUserDetails(access_token)
                .then(response => {
                    console.log(response);
                });
        })
    }
  }

  const OAuth2Consumer = new GoogleAuth({
      clientId: GOOGLE_CLIENTID,
      clientSecret: GOOGLE_CLIENTSECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      accessTokenUrl: 'https://oauth2.googleapis.com/token',
      redirectUri: 'https://alive.xprss.org/google'
  });
  
  return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={onButtonClick}>
          <Image source={require('./assets/google-signin.png')}/>
        </TouchableOpacity>
        <Modal
          transparent
          visible={state.visible}
        >
          <View style={styles.container}>
            <View style={styles.wrapper}>
              <WebView 
                source={{ uri: state.url }} 
                style={{flex: 1}} 
                javaScriptEnabled={true}
                userAgent="Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
                startInLoadingState
                onNavigationStateChange={onNavigationStateChange}
              />
            </View>
            <TouchableOpacity
              onPress={() => setState({...state, visible: false})}
              style={styles.close}
            >
              <Text style={{color: 'white', fontWeight: 'bold'}}>X</Text>
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

