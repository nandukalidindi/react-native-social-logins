import * as React from 'react';

import OAuth1Login from './components/OAuth1Login';
import OAuth2Login from './components/OAuth2Login';

export const OAUTH1: string = 'oauth1.0';
export const OAUTH2: string = 'oauth2.0';

export const OAUTH_SCREEN_MAPPING: any = {
  [OAUTH1]: OAuth1Login,
  [OAUTH2]: OAuth2Login
}