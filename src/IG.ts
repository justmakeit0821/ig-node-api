import axios from 'axios'
import { API_BASE_URL } from './constant'
import { Session, SecurityTokens } from './types'
import { authenticate, fetchSecurityTokens } from './rest/session'
import { searchEpics } from './rest/market'

export default class IG {
    private username: string
    private password: string
    private igApiKey: string
    private session: Session
    private securityTokens: SecurityTokens

    constructor(username: string, password: string, igApiKey: string) {
        this.username = username
        this.password = password
        this.igApiKey = igApiKey
    }

    async authenticate() {
        this.session = await authenticate(API_BASE_URL.DEMO, this.username, this.password, this.igApiKey)
        return this.session
    }

    async fetchSecurityTokens() {
        this.securityTokens = await fetchSecurityTokens(
            API_BASE_URL.DEMO,
            this.igApiKey,
            this.session.accountId,
            this.session.oauthToken.access_token
        )
        return this.securityTokens
    }

    async searchEpics(query: string) {
        return await searchEpics(API_BASE_URL.DEMO, query, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }
}
