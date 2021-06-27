import * as React from 'react'
import { View, StyleSheet, Modal, TouchableOpacity, Image, Text } from 'react-native';

import { WebView } from 'react-native-webview';

export default function OAuth1Login(props: any): JSX.Element {

  let timeoutId: number = -1;

  const [state, setState] = React.useState({ visible: false, url: '' });

  const onButtonClick = (event: any) => {
    OAuth1Consumer
      .getRequestToken()
      .then((response: any) => {
        const authorizationUrl = OAuth1Consumer.getAuthorizationUrl({ request_token: response.oauth_token })

        setState({ visible: true, url: authorizationUrl });
      });
  }

  const onNavigationStateChange = ({ url }: any) => {
    clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {

      if (url.includes(OAuth1Consumer.config.redirectUri)) {
        const tokenParams = OAuth1Consumer.getRequestTokenParams(url);

        OAuth1Consumer.getAccessToken(tokenParams)
          .then((response: any) => {
            const accessTokenParams = OAuth1Consumer.getAccessTokenParams(response);

            setState({ visible: false, url: '' });

            OAuth1Consumer.getUserDetails(accessTokenParams)
              .then((response: any) => {
                console.log(response);
              })
          })
      }

    }, 1000)
  }

  const OAuth1Consumer = props.oauthConsumer;

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
              javaScriptEnabled={false}
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

