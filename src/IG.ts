import { API_BASE_URL, MarketDetailsFilterType } from './constant'
import { fetchOauthTokens, fetchSecurityTokens } from './rest/session'
import { searchEpics, getMarketCategories, getMarketSubCategories, getMarketsDetails, getMarketDetails, getPrices } from './rest/market'
import { getWatchlists, getWatchlistDetail, createWatchlist, deleteWatchlist } from './rest/watchlist'
import { createOtcPosition, closeOtcPosition, checkDealStatus, getOpenPositions, getOpenPosition } from './rest/dealing'
import { getAccountDetails, getActivityHistory, getTransactionHistory } from './rest/account'
import { connectLightstreamer } from './stream/'

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

    /* REST APIs */
    /** Authenticate with username and password to obtain trading session and security tokens for subsequent API access */
    async authenticate() {
        this.session = await fetchOauthTokens(API_BASE_URL.DEMO, this.username, this.password, this.igApiKey)
        this.securityTokens = await fetchSecurityTokens(
            API_BASE_URL.DEMO,
            this.igApiKey,
            this.session.accountId,
            this.session.oauthToken.access_token
        )
        return this.session
    }

    /** Returns all markets matching the search term */
    async searchEpics(query: string) {
        return await searchEpics(API_BASE_URL.DEMO, query, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Returns all top-level nodes (market categories) in the market navigation hierarchy. */
    async getMarketCategories() {
        return await getMarketCategories(API_BASE_URL.DEMO, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Returns all sub-nodes of the given node in the market navigation hierarchy. */
    async getMarketSubCategories(nodeId: string) {
        return await getMarketSubCategories(nodeId, API_BASE_URL.DEMO, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Returns the details of the given markets. */
    async getMarketsDetails(epics: string[], filter: MarketDetailsFilterType = MarketDetailsFilterType.ALL) {
        return await getMarketsDetails(epics, filter, API_BASE_URL.DEMO, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Returns the details of the given market. */
    async getMarketDetails(epic: string) {
        return await getMarketDetails(epic, API_BASE_URL.DEMO, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Returns historical prices for a particular instrument. By default returns the minute prices within the last 10 minutes. */
    async getPrices(priceRequest: PriceRequest) {
        return await getPrices(
            API_BASE_URL.DEMO,
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
        return await getWatchlists(API_BASE_URL.DEMO, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Returns all markets of a given watchlist.  */
    async getWatchlistDetail(watchlistId: string) {
        return await getWatchlistDetail(watchlistId, API_BASE_URL.DEMO, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Create a watchlist of markets. */
    async createWatchlist(createWatchlistRequest: CreateWatchlistRequest) {
        return await createWatchlist(
            createWatchlistRequest,
            API_BASE_URL.DEMO,
            this.igApiKey,
            this.session.accountId,
            this.session.oauthToken.access_token
        )
    }

    /** Delete a given watchlist. */
    async deleteWatchlist(watchlistId: string) {
        return await deleteWatchlist(watchlistId, API_BASE_URL.DEMO, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Creates an OTC position - either Buy or Sell direction. */
    async createOtcPosition(createPositionRequest: CreatePositionRequest) {
        return await createOtcPosition(
            createPositionRequest,
            API_BASE_URL.DEMO,
            this.igApiKey,
            this.session.accountId,
            this.session.oauthToken.access_token
        )
    }

    /** Close one or more OTC positions. */
    async closeOtcPosition(closePositionRequest: ClosePositionRequest) {
        return await closeOtcPosition(
            closePositionRequest,
            API_BASE_URL.DEMO,
            this.igApiKey,
            this.session.accountId,
            this.session.oauthToken.access_token
        )
    }

    /** Returns a deal confirmation for the given deal reference. */
    async checkDealStatus(dealReference: string) {
        return await checkDealStatus(dealReference, API_BASE_URL.DEMO, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Returns all open positions for the active account. */
    async getOpenPositions() {
        return await getOpenPositions(API_BASE_URL.DEMO, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Returns an open position for the active account by Deal Id. */
    async getOpenPosition(dealId: string) {
        return await getOpenPosition(dealId, API_BASE_URL.DEMO, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Returns a list of accounts belonging to the logged-in client. */
    async getAccountDetails() {
        return await getAccountDetails(API_BASE_URL.DEMO, this.igApiKey, this.session.accountId, this.session.oauthToken.access_token)
    }

    /** Returns the account activity history. */
    async getActivityHistory(activityHistoryRequest: ActivityHistoryRequest) {
        return await getActivityHistory(
            API_BASE_URL.DEMO,
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
            API_BASE_URL.DEMO,
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
