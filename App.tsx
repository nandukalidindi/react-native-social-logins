import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import TwitterAuth from './auth/TwitterAuth';
import GoogleAuth from './auth/GoogleAuth';
import LinkedinAuth from './auth/LinkedinAuth';
import FacebookAuth from './auth/FacebookAuth';

import { 
  TWITTER_CLIENTID, TWITTER_CLIENTSECRET, TWITTER_CALLBACK_URI,
  GOOGLE_CLIENTID, GOOGLE_CLIENTSECRET, GOOGLE_CALLBACK_URI,
  LINKEDIN_CLIENTID, LINKEDIN_CLIENTSECRET, LINKEDIN_CALLBACK_URI,
  FACEBOOK_CLIENTID, FACEBOOK_CLIENTSECRET, FACEBOOK_CALLBACK_URI
} from "@env"

import OAuth1Login from './components/OAuth1Login';
import OAuth2Login from './components/OAuth2Login';

export default function App() {

  const twitterAuthConsumer = new TwitterAuth({
    clientId: TWITTER_CLIENTID,
    clientSecret: TWITTER_CLIENTSECRET,
    requestTokenUrl: 'https://api.twitter.com/oauth/request_token/',
    authorizationUrl: 'https://api.twitter.com/oauth/authorize/',
    accessTokenUrl: 'https://api.twitter.com/oauth/access_token',
    redirectUri: TWITTER_CALLBACK_URI
  });

  const linkedinAuthConsumer = new LinkedinAuth({
    clientId: LINKEDIN_CLIENTID,
    clientSecret: LINKEDIN_CLIENTSECRET,
    authorizationUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    accessTokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
    redirectUri: LINKEDIN_CALLBACK_URI
  });

  const googleAuthConsumer = new GoogleAuth({
    clientId: GOOGLE_CLIENTID,
    clientSecret: GOOGLE_CLIENTSECRET,
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    accessTokenUrl: 'https://oauth2.googleapis.com/token',
    redirectUri: GOOGLE_CALLBACK_URI
  }); 
  
  const facebookAuthConsumer = new FacebookAuth({
    clientId: FACEBOOK_CLIENTID,
    clientSecret: FACEBOOK_CLIENTSECRET,
    authorizationUrl: 'https://www.facebook.com/v10.0/dialog/oauth',
    accessTokenUrl: 'https://graph.facebook.com/v10.0/oauth/access_token',
    redirectUri: FACEBOOK_CALLBACK_URI
  }); 

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <OAuth1Login 
        logo={<AntDesign name="twitter" size={30} color="black" />}
        oauthConsumer={twitterAuthConsumer} 
      />
      <OAuth2Login 
        logo={<AntDesign name="linkedin-square" size={30} color="black" />}
        oauthConsumer={linkedinAuthConsumer} 
      />
      <OAuth2Login 
        logo={<AntDesign name="google" size={30} color="black" />}
        oauthConsumer={googleAuthConsumer} 
      />
      <OAuth2Login 
        logo={<AntDesign name="facebook-square" size={30} color="black" />}
        oauthConsumer={facebookAuthConsumer} 
      />
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
