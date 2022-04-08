import { MarketDetailsFilterType } from './constant'
import { fetchOauthTokens, fetchSecurityTokens, refreshOauthTokens, logout } from './rest/session'
import { searchEpics, getMarketCategories, getMarketSubCategories, getMarketsDetails, getMarketDetails, getPrices } from './rest/market'
import { getWatchlists, getWatchlistDetail, createWatchlist, deleteWatchlist } from './rest/watchlist'
import { createOtcPosition, closeOtcPosition, checkDealStatus, getOpenPositions, getOpenPosition } from './rest/dealing'
import { getAccountDetails, getActivityHistory, getTransactionHistory } from './rest/account'
import { connectLightstreamer } from './stream/'
import { parseAxiosError } from './rest/parse-axios-error'
import {
    Session,
    SecurityTokens,
    PriceRequest,
    CreateWatchlistRequest,
    CreatePositionRequest,
    ClosePositionRequest,
    ActivityHistoryRequest,
    TransactionHistoryRequest
} from './@types'

export default class IG {
    private username: string
    private password: string
    private apiBaseUrl: string
    private igApiKey: string
    private session: Session
    private securityTokens: SecurityTokens
    private isLogon: boolean
    private refreshTimeoutId: NodeJS.Timeout
    private REFRESH_OFFSET = 5

    private async autoRefreshOauthTokens() {
        if (!this.isLogon) return
        clearTimeout(this.refreshTimeoutId)
        try {
            this.session.oauthToken = await refreshOauthTokens(this.apiBaseUrl, this.session.oauthToken.refresh_token, this.igApiKey)
        } catch (err: any) {
            console.warn('[ig-node-api]', parseAxiosError(err))
        }
        this.refreshTimeoutId = setTimeout(() => {
            this.autoRefreshOauthTokens()
        }, (Number(this.session.oauthToken.expires_in) - this.REFRESH_OFFSET) * 1000)
    }

    constructor(username: string, password: string, igApiKey: string, apiBaseUrl: string) {
        this.username = username
        this.password = password
        this.igApiKey = igApiKey
        this.apiBaseUrl = apiBaseUrl
        this.isLogon = false
    }

    /* REST APIs */
    /** Login with username and password to obtain trading session and security tokens for subsequent API access */
    async login() {
        this.session = await fetchOauthTokens(this.apiBaseUrl, this.username, this.password, this.igApiKey)
        this.securityTokens = await fetchSecurityTokens(this.apiBaseUrl, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
        this.isLogon = true

        // keep refreshing the OAuth Tokens (Access + Refresh Tokens) before the Access Token expired
        clearTimeout(this.refreshTimeoutId)
        this.refreshTimeoutId = setTimeout(() => {
            this.autoRefreshOauthTokens()
        }, (Number(this.session.oauthToken.expires_in) - this.REFRESH_OFFSET) * 1000)

        return this.session
    }

    /** Manually Refresh OAuth Tokens */
    async refreshOauthTokens() {
        clearTimeout(this.refreshTimeoutId)
        try {
            this.session.oauthToken = await refreshOauthTokens(this.apiBaseUrl, this.session.oauthToken.refresh_token, this.igApiKey)
        } catch (err: any) {
            console.warn('[ig-node-api]', parseAxiosError(err))
        }
        this.refreshTimeoutId = setTimeout(() => {
            this.autoRefreshOauthTokens()
        }, (Number(this.session.oauthToken.expires_in) - this.REFRESH_OFFSET) * 1000)

        return this.session.oauthToken
    }

    /** Logout */
    async logout() {
        await logout(this.apiBaseUrl, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
        this.session = {
            clientId: '',
            accountId: '',
            timezoneOffset: NaN,
            lightstreamerEndpoint: '',
            oauthToken: {
                access_token: '',
                refresh_token: '',
                scope: '',
                token_type: '',
                expires_in: ''
            }
        }
        this.isLogon = false
    }

    /** Returns all markets matching the search term */
    async searchEpics(query: string) {
        return await searchEpics(this.apiBaseUrl, query, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Returns all top-level nodes (market categories) in the market navigation hierarchy. */
    async getMarketCategories() {
        return await getMarketCategories(this.apiBaseUrl, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Returns all sub-nodes of the given node in the market navigation hierarchy. */
    async getMarketSubCategories(nodeId: string) {
        return await getMarketSubCategories(nodeId, this.apiBaseUrl, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Returns the details of the given markets. */
    async getMarketsDetails(epics: string[], filter: MarketDetailsFilterType = MarketDetailsFilterType.ALL) {
        return await getMarketsDetails(epics, filter, this.apiBaseUrl, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Returns the details of the given market. */
    async getMarketDetails(epic: string) {
        return await getMarketDetails(epic, this.apiBaseUrl, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Returns historical prices for a particular instrument. By default returns the minute prices within the last 10 minutes. */
    async getPrices(priceRequest: PriceRequest) {
        return await getPrices(
            this.apiBaseUrl,
            this.igApiKey,
            this.session.accountId,
            this.session.oauthToken.access_token,
            priceRequest.epic,
            priceRequest.resolution,
            priceRequest.max,
            priceRequest.pageSize,
            priceRequest.pageNumber,
            priceRequest.from,
            priceRequest.to
        )
    }

    /** Returns all watchlists belonging to the active account. */
    async getWatchlists() {
        return await getWatchlists(this.apiBaseUrl, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Returns all markets of a given watchlist.  */
    async getWatchlistDetail(watchlistId: string) {
        return await getWatchlistDetail(watchlistId, this.apiBaseUrl, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Create a watchlist of markets. */
    async createWatchlist(createWatchlistRequest: CreateWatchlistRequest) {
        return await createWatchlist(
            createWatchlistRequest,
            this.apiBaseUrl,
            this.igApiKey,
            this.session.accountId,
            this.session.oauthToken.access_token
        )
    }

    /** Delete a given watchlist. */
    async deleteWatchlist(watchlistId: string) {
        return await deleteWatchlist(watchlistId, this.apiBaseUrl, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Creates an OTC position - either Buy or Sell direction. */
    async createOtcPosition(createPositionRequest: CreatePositionRequest) {
        return await createOtcPosition(
            createPositionRequest,
            this.apiBaseUrl,
            this.igApiKey,
            this.session.accountId,
            this.session.oauthToken.access_token
        )
    }

    /** Close one or more OTC positions. */
    async closeOtcPosition(closePositionRequest: ClosePositionRequest) {
        return await closeOtcPosition(
            closePositionRequest,
            this.apiBaseUrl,
            this.igApiKey,
            this.session.accountId,
            this.session.oauthToken.access_token
        )
    }

    /** Returns a deal confirmation for the given deal reference. */
    async checkDealStatus(dealReference: string) {
        return await checkDealStatus(dealReference, this.apiBaseUrl, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Returns all open positions for the active account. */
    async getOpenPositions() {
        return await getOpenPositions(this.apiBaseUrl, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Returns an open position for the active account by Deal Id. */
    async getOpenPosition(dealId: string) {
        return await getOpenPosition(dealId, this.apiBaseUrl, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Returns a list of accounts belonging to the logged-in client. */
    async getAccountDetails() {
        return await getAccountDetails(this.apiBaseUrl, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Returns the account activity history. */
    async getActivityHistory(activityHistoryRequest: ActivityHistoryRequest) {
        return await getActivityHistory(
            this.apiBaseUrl,
            this.igApiKey,
            this.session.accountId,
            this.session.oauthToken.access_token,
            activityHistoryRequest.from,
            activityHistoryRequest.detailed,
            activityHistoryRequest.pageSize,
            activityHistoryRequest.dealId,
            activityHistoryRequest.filter,
            activityHistoryRequest.to
        )
    }

    /** Returns the transaction history. */
    async getTransactionHistory(transactionHistoryRequest: TransactionHistoryRequest) {
        return await getTransactionHistory(
            this.apiBaseUrl,
            this.igApiKey,
            this.session.accountId,
            this.session.oauthToken.access_token,
            transactionHistoryRequest.type,
            transactionHistoryRequest.maxSpanSeconds,
            transactionHistoryRequest.pageSize,
            transactionHistoryRequest.pageNumber,
            transactionHistoryRequest.from,
            transactionHistoryRequest.to
        )
    }

    /* Streaming APIs */
    /** Connect To Lightstreamer Server */
    connectLightstreamer() {
        return connectLightstreamer(this.session.lightstreamerEndpoint, this.session.accountId, this.securityTokens.cst, this.securityTokens.xst)
    }
}
