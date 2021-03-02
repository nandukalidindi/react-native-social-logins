interface OAuth1Config {
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

const OAUTH_VERSION = '1.0';
const OAUTH_SIGNATURE_METHOD = 'HMAC-SHA1';

import oauthSignature from 'oauth-signature';
import { objectToQueryString, queryStringToObject } from '../utils/auth';

class OAuth1 {
    config: OAuth1Config

    constructor(config: OAuth1Config) {
        this.config = config;
    }

    buildAuthorizationUrl({ request_token, request_token_verifier }: RequestTokenResponse) {
        return `${this.config.authorizationUrl}?oauth_token=${request_token}&oauth_token_verifier=${request_token_verifier}`;
    }

    fetchRequestToken() {
        const timestamp = Math.floor((new Date()).getTime() / 1000);

        const method = 'POST',
            url = this.config.requestTokenUrl,
            parameters = {
                oauth_consumer_key : this.config.clientId,
                oauth_nonce : timestamp,
                oauth_timestamp : timestamp,
                oauth_signature_method : OAUTH_SIGNATURE_METHOD,
                oauth_version : OAUTH_VERSION
            };

        const encodedSignature = oauthSignature.generate(method, url, parameters, this.config.clientSecret);

        const authorizationHeader = objectToQueryString({ ...parameters, oauth_signature: encodedSignature });

        fetch(url, {
            method,
            headers: {
                Authorization: `OAuth ${authorizationHeader}`
            }
        })
        .then(response => response.text())
        .then(response => {
            
        });
    }

    fetchAccessToken({ request_token, request_token_verifier }: RequestTokenResponse) {
        const timestamp = Math.floor((new Date()).getTime() / 1000);
        const method = 'POST',
            url = this.config.accessTokenUrl,
            parameters = {
                oauth_consumer_key : this.config.clientId,
                oauth_nonce : timestamp,
                oauth_timestamp : timestamp,
                oauth_signature_method : OAUTH_SIGNATURE_METHOD,
                oauth_version : OAUTH_VERSION,
                oauth_token: request_token,
                oauth_verifier: request_token_verifier
            };

        const encodedSignature = oauthSignature.generate(method, url, parameters, this.config.clientSecret);

        const accessTokenHeaderSignature = objectToQueryString({ ...parameters, oauth_signature: encodedSignature });

        return fetch(url, {
            method,
            headers: {
                Authorization: `OAuth ${accessTokenHeaderSignature}`
            }
        });
    }
}