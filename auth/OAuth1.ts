import { OAuth1Config, RequestTokenParams, AccessTokenParams } from './interfaces';

interface OAuthThreeLeggedFlow {
    getAuthorizationUrl({ request_token, request_token_verifier }: RequestTokenParams): string

    getRequestToken(): Promise<any>

    getAccessToken({ request_token, request_token_verifier }: RequestTokenParams): Promise<any>

    getUserDetails({ access_token, access_token_secret}: AccessTokenParams): Promise<any>

    getRequestTokenParams(response: any): RequestTokenParams

    getAccessTokenParams(response: any): AccessTokenParams    
}

class OAuth1 {
    config: OAuth1Config

    constructor(config: OAuth1Config) {
        this.config = config;
    }
}

export { OAuth1, OAuthThreeLeggedFlow }