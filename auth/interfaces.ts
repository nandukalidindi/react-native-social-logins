export interface OAuth1Config {
    requestTokenUrl: string,
    authorizationUrl: string,
    accessTokenUrl: string,    
    redirectUri: string,
    clientId: string,
    clientSecret: string
}

export interface RequestTokenParams {
    request_token: string,
    request_token_verifier?: string
}

export interface AccessTokenParams {
    access_token: string,
    access_token_secret: string
}