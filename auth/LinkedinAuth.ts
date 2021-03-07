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

export default class LinkedinAuth extends OAuth2 implements OAuth2ThreeLeggedFlow {
    getAuthorizationUrl() {
        const timestamp = Math.floor((new Date()).getTime() / 1000);
        const scope = ['r_emailaddress', 'r_liteprofile', 'w_member_social'].join("%20");

        const params = {
            response_type: 'code',
            client_id: this.config.clientId,
            redirect_uri: this.config.redirectUri,
            state: timestamp,
            scope
        };

        return `${this.config.authorizationUrl}?${objectToQueryString(params, '&')}`;
    }  
    
    getAuthorizationCode(redirect_uri: string) {

        const queryParamString = redirect_uri.split("?").pop();

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
        const USERS_ME_URL = "https://api.linkedin.com/v2/me";
        const USER_EMAIL_URL = "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))";

        const fetchUsersMe = fetchResponse(USERS_ME_URL, access_token);
        const fetchUserEmail = fetchResponse(USER_EMAIL_URL, access_token);
        
        return Promise.all([fetchUsersMe, fetchUserEmail])
    }    
}