export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            IG_LIVE_API_KEY: string
            IG_LIVE_USERNAME: string
            IG_LIVE_PASSWORD: string
            IG_DEMO_API_KEY: string
            IG_DEMO_USERNAME: string
            IG_DEMO_PASSWORD: string
        }
    }
}

export interface OauthToken {
    access_token: string
    refresh_token: string
    scope: string
    token_type: string
    expires_in: string
}

export interface Session {
    clientId: string
    accountId: string
    timezoneOffset: number
    lightstreamerEndpoint: string
    oauthToken: OauthToken
}

export interface Market {
    epic: string
    instrumentName: string
    instrumentType: string
    expiry: string
    high: number
    low: number
    percentageChange: number
    netChange: number
    updateTime: string
    updateTimeUTC: string
    bid: number
    offer: number
    delayTime: number
    streamingPricesAvailable: boolean
    marketStatus: string
    scalingFactor: number
}

export interface SecurityTokens {
    cst: string
    xst: string
}
