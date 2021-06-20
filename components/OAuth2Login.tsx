import * as React from 'react'
import { View, StyleSheet, Modal, TouchableOpacity, Image, Text } from 'react-native';

import { WebView } from 'react-native-webview';

export default function OAuth2Login(props: any): JSX.Element {

  const [state, setState] = React.useState({ visible: false, url: '' });

  const onButtonClick = (event: any) => {
    setState({ visible: true, url: OAuth2Consumer.getAuthorizationUrl() });
  }

  const onNavigationStateChange = ({ url }: any) => {
    if (url.startsWith(OAuth2Consumer.config.redirectUri)) {

      const code = OAuth2Consumer.getAuthorizationCode(url);

      OAuth2Consumer.getAccessToken(decodeURIComponent(code))
        .then((response: any) => {
          const { access_token, expires_in } = response;

          if (!access_token) return;

          setState({ visible: false, url: '' });

          OAuth2Consumer.getUserDetails(access_token)
            .then((response: any) => {
              console.log(response);
            });
        })
    }
  }

  const OAuth2Consumer = props.oauthConsumer;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={onButtonClick}>
        {props.logo}
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
              userAgent='Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'
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

