import React from 'react';
import { View } from 'react-native';

import { OAUTH_SCREEN_MAPPING } from './constants';

import ProviderConfig from './config';

const OAuthLogin = ({ type, logo, oauthConsumer }: any) => {
  const LoginComponent = OAUTH_SCREEN_MAPPING[type];

  return (
    <LoginComponent
      logo={logo}
      oauthConsumer={oauthConsumer}
    />
  );
}

export default function App() {  

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      {
        ProviderConfig.map((config, index) => (
          <OAuthLogin
            key={`login-${config.type}-${config.name}`}
            type={config.type}
            logo={config.icon}
            oauthConsumer={config.consumer}
          />
        ))
      }          
    </View>
  );
}
