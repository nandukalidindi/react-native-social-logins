interface OAuth2Config {
    requestTokenUrl: string,
    authorizationUrl: string,
    accessTokenUrl: string,    
    redirectUri: string,
    clientId: string,
    clientSecret: string
}

interface RequestTokenResponse {
    request_token: string,
    request_token_verifier: string
}

const OAUTH_VERSION = '2.0';
const OAUTH_SIGNATURE_METHOD = 'HMAC-SHA1';

import { objectToQueryString, queryStringToObject } from '../utils/auth';

export default class OAuth2 {
    config: OAuth2Config

    constructor(config: OAuth2Config) {
        this.config = config;
    }

    buildAuthorizationUrl() {
        const timestamp = Math.floor((new Date()).getTime() / 1000);
        const scope = ['r_emailaddress', 'r_liteprofile', 'w_member_social'].join("%20");
        return `https://www.linkedin.com/oauth/v2/authorization?response_type=${'code'}&client_id=${clientId}&redirect_uri=${redirectUri}&state=${timestamp}&scope=${scope}`;
    }    

    async fetchAccessToken(request_token: string) {

        const timestamp = Math.floor((new Date()).getTime() / 1000);
    
        return fetch(this.config.accessTokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=${'authorization_code'}&code=${request_token}&redirect_uri=${this.config.redirectUri}&client_id=${this.config.clientId}&client_secret=${this.config.clientSecret}`          
        })
            .then(response => response.json());
    }
}