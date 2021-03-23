import { OAuth2, OAuth2ThreeLeggedFlow } from './OAuth2';

const OAUTH_VERSION = '2.0';
const OAUTH_SIGNATURE_METHOD = 'HMAC-SHA1';

import { objectToQueryString, queryStringToObject } from '../utils/auth';

const fetchResponse = (url: string, token: string): Promise<any> => {
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => response.json());
}

export default class GoogleAuth extends OAuth2 implements OAuth2ThreeLeggedFlow {
  getAuthorizationUrl() {
    const timestamp = Math.floor((new Date()).getTime() / 1000);

    const queryParams = {
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      // scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
      // scope: 'https://www.googleapis.com/auth/userinfo.profile',
      scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
      access_type: 'online',
      state: timestamp.toString(),
      prompt: 'consent'
    }

    return `${this.config.authorizationUrl}?${objectToQueryString(queryParams, '&')}`;
  }

  getAuthorizationCode(redirect_uri: string) {

    const queryParamString = redirect_uri.split("?").pop() || "";

    console.log(queryParamString);
    console.log(queryStringToObject(queryParamString));

    const { code, state } = queryStringToObject(queryParamString);

    return code;
  }

  getAccessToken(request_token: string) {

    const params = {
      grant_type: 'authorization_code',
      code: request_token,
      redirect_uri: this.config.redirectUri,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret
    }

    return fetch(this.config.accessTokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: objectToQueryString(params, '&')
    })
      .then(response => response.json())
  }

  getUserDetails(access_token: string) {
    console.log('access TOKEN');
    console.log(access_token);

    const USER_INFO_URL = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json';

    return fetchResponse(USER_INFO_URL, access_token);
  }
}