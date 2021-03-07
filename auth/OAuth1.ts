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
    request_token_verifier?: string
}

interface AccessTokenResponse {
    access_token: string,
    access_token_secret: string
}

const OAUTH_VERSION = '1.0';
const OAUTH_SIGNATURE_METHOD = 'HMAC-SHA1';

import oauthSignature from 'oauth-signature';
import { objectToQueryString, queryStringToObject } from '../utils/auth';

export default class OAuth1 {
    config: OAuth1Config

    constructor(config: OAuth1Config) {
        this.config = config;
    }

    buildAuthorizationUrl({ request_token, request_token_verifier }: RequestTokenResponse) {
        return `${this.config.authorizationUrl}?oauth_token=${request_token}`;
    }

    buildRequestTokenParams(redirectUri: string): RequestTokenResponse {
        const tokenParams = queryStringToObject(redirectUri.split("?")[1]);

        return {
            request_token: tokenParams.oauth_token,
            request_token_verifier: tokenParams.oauth_verifier
        };
    }

    buildAccessTokenParams(textResponse: string): AccessTokenResponse {
        const tokenParams = queryStringToObject(textResponse);

        return {
            access_token: tokenParams.oauth_token,
            access_token_secret: tokenParams.oauth_token_secret
        };
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

        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `OAuth ${authorizationHeader}`
            }
        })
        .then(response => response.text())
        .then(response => queryStringToObject(response));
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
        }).then(response => response.text());
    }

    fetchUserDetails({ access_token, access_token_secret }: AccessTokenResponse) {
        const timestamp = Math.floor((new Date()).getTime() / 1000);
        
        const httpMethod = "GET",
            url = `https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true`,
            parameters = {
                oauth_consumer_key : this.config.clientId,
                oauth_nonce : timestamp,
                oauth_timestamp : timestamp,
                oauth_signature_method : 'HMAC-SHA1',
                oauth_version : '1.0',
                oauth_token: access_token,
                include_email: true
            },
            consumerSecret = this.config.clientSecret,

            encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, access_token_secret);

        return fetch(url, {
            method: httpMethod,
            headers: {
                Authorization: `OAuth oauth_consumer_key=${parameters.oauth_consumer_key},oauth_token=${access_token},oauth_signature_method="HMAC-SHA1",oauth_timestamp=${timestamp},oauth_nonce=${parameters.oauth_nonce},oauth_version="1.0",oauth_signature=${encodedSignature}`
            }
        }).then(response => response.json());
    }
}