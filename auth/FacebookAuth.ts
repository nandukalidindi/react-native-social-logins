// FACEBOOK LOGIN FLOW https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/

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

export default class FacebookAuth extends OAuth2 implements OAuth2ThreeLeggedFlow {
  getAuthorizationUrl() {
    const timestamp = Math.floor((new Date()).getTime() / 1000);

    const queryParams = {
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      auth_type: 'reauthenticate',
      auth_nonce: timestamp.toString(),
      state: timestamp.toString()
    }

    return `${this.config.authorizationUrl}?${objectToQueryString(queryParams, '&')}`;
  }

  getAuthorizationCode(redirect_uri: string) {

    const queryParamString = redirect_uri.split("?").pop() || "";

    const { code, state } = queryStringToObject(queryParamString);

    return code;
  }

  getAccessToken(request_token: string) {
    const params = {
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      client_secret: this.config.clientSecret,
      code: request_token
    }

    return fetch(this.config.accessTokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: objectToQueryString(params, '&')
    })
      .then(response => response.json())
  }

  getUserDetails(access_token: string) {
    const USER_INFO_URL = `https://graph.facebook.com/me?access_token=${access_token}&fields=email,first_name,last_name`;

    return fetchResponse(USER_INFO_URL, access_token);
  }
}