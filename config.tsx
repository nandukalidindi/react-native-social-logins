import * as React from 'react';

import TwitterAuth from './auth/providers/TwitterAuth';
import GoogleAuth from './auth/providers/GoogleAuth';
import LinkedinAuth from './auth/providers/LinkedinAuth';
import FacebookAuth from './auth/providers/FacebookAuth';

import { AntDesign } from '@expo/vector-icons';

import { OAUTH1, OAUTH2 } from './constants';

import { 
  TWITTER_CLIENTID, TWITTER_CLIENTSECRET, TWITTER_CALLBACK_URI,
  GOOGLE_CLIENTID, GOOGLE_CLIENTSECRET, GOOGLE_CALLBACK_URI,
  LINKEDIN_CLIENTID, LINKEDIN_CLIENTSECRET, LINKEDIN_CALLBACK_URI,
  FACEBOOK_CLIENTID, FACEBOOK_CLIENTSECRET, FACEBOOK_CALLBACK_URI
} from '@env'

export default [{
  name: 'Twitter',
  type: OAUTH1,
  icon: <AntDesign name="twitter" size={30} color="black" />,
  consumer: new TwitterAuth({
    clientId: TWITTER_CLIENTID,
    clientSecret: TWITTER_CLIENTSECRET,
    requestTokenUrl: 'https://api.twitter.com/oauth/request_token/',
    authorizationUrl: 'https://api.twitter.com/oauth/authorize/',
    accessTokenUrl: 'https://api.twitter.com/oauth/access_token',
    redirectUri: TWITTER_CALLBACK_URI
  }) 
}, {
  name: 'Google',
  type: OAUTH2,
  icon: <AntDesign name="google" size={30} color="black" />,
  consumer: new GoogleAuth({
    clientId: GOOGLE_CLIENTID,
    clientSecret: GOOGLE_CLIENTSECRET,
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    accessTokenUrl: 'https://oauth2.googleapis.com/token',
    redirectUri: GOOGLE_CALLBACK_URI
  })
}, {
  name: 'LinkedIn',
  type: OAUTH2,
  icon: <AntDesign name="linkedin-square" size={30} color="black" />,
  consumer: new LinkedinAuth({
    clientId: LINKEDIN_CLIENTID,
    clientSecret: LINKEDIN_CLIENTSECRET,
    authorizationUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    accessTokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
    redirectUri: LINKEDIN_CALLBACK_URI
  })
}, {
  name: 'Facebook',
  type: OAUTH2,
  icon: <AntDesign name="facebook-square" size={30} color="black" />,
  consumer: new FacebookAuth({
    clientId: FACEBOOK_CLIENTID,
    clientSecret: FACEBOOK_CLIENTSECRET,
    authorizationUrl: 'https://www.facebook.com/v10.0/dialog/oauth',
    accessTokenUrl: 'https://graph.facebook.com/v10.0/oauth/access_token',
    redirectUri: FACEBOOK_CALLBACK_URI
  })
}]