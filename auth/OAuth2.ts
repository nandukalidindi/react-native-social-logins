import { OAuth2Config } from './interfaces';

const OAUTH_VERSION = '2.0';
const OAUTH_SIGNATURE_METHOD = 'HMAC-SHA1';

import { objectToQueryString, queryStringToObject } from '../utils/auth';

interface OAuth2ThreeLeggedFlow {
    getAuthorizationUrl(): string

    getAuthorizationCode(redirect_uri: string): string
    
    getAccessToken(request_token: string): Promise<any>

    getUserDetails(access_token: string): Promise<any>
}

class OAuth2 {
    config: OAuth2Config

    constructor(config: OAuth2Config) {
        this.config = config;
    }    
}

export { OAuth2, OAuth2ThreeLeggedFlow };