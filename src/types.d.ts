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
    instrumentType: InstrumentType
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
    marketStatus: MarketStatus
    scalingFactor: number
}

export interface MarketCategory {
    id: string
    name: string
}

export interface SecurityTokens {
    cst: string
    xst: string
}

export interface Candle {
    LTV: string
    TTV: string
    UTM: string
    DAY_OPEN_MID: string
    DAY_NET_CHG_MID: string
    DAY_PERC_CHG_MID: string
    DAY_HIGH: string
    DAY_LOW: string
    OFR_OPEN: string
    OFR_HIGH: string
    OFR_LOW: string
    OFR_CLOSE: string
    BID_OPEN: string
    BID_HIGH: string
    BID_LOW: string
    BID_CLOSE: string
    LTP_OPEN: string
    LTP_HIGH: string
    LTP_LOW: string
    LTP_CLOSE: string
    CONS_END: string
    CONS_TICK_COUNT: string
}

/* MarketDetail - Start */
export interface MarketDetail {
    dealingRules: DealingRules
    instrument: Instrument
    snapshot: Snapshot
}

export interface DealingRules {
    controlledRiskSpacing: DealingRule
    marketOrderPreference: MarketOrderPreference
    maxStopOrLimitDistance: DealingRule
    minControlledRiskStopDistance: DealingRule
    minDealSize: DealingRule
    minNormalStopOrLimitDistance: DealingRule
    minStepDistance: DealingRule
    trailingStopsPreference: TrailingStopsPreference
}

export type MarketOrderPreference = 'AVAILABLE_DEFAULT_OFF' | 'AVAILABLE_DEFAULT_ON' | 'NOT_AVAILABLE'
export type TrailingStopsPreference = 'AVAILABLE' | 'NOT_AVAILABLE'

export interface DealingRule {
    unit: Unit
    value: number
}

export type Unit = 'PERCENTAGE' | 'POINTS'

export interface Instrument {
    chartCode: string
    contractSize: string
    controlledRiskAllowed: boolean
    country: string
    currencies: Currency[]
    epic: string
    expiry: string
    expiryDetails: MarketExpiryDetails
    forceOpenAllowed: boolean
    limitedRiskPremium: DealingRule
    lotSize: number
    marginDepositBands: MarginDepositBand[]
    marginFactor: number
    marginFactorUnit: Unit
    marketId: string
    name: string
    newsCode: string
    onePipMeans: string
    openingHours: TimeRange[]
    rolloverDetails: MarketRolloverDetails
    slippageFactor: DealingRule
    specialInfo: string[]
    sprintMarketsMaximumExpiryTime: number
    sprintMarketsMinimumExpiryTime: number
    stopsLimitsAllowed: boolean
    streamingPricesAvailable: boolean
    type: InstrumentType
    unit: TradeUnit
    valueOfOnePip: string
}

export type InstrumentType =
    | 'BINARY'
    | 'BUNGEE_CAPPED'
    | 'BUNGEE_COMMODITIES'
    | 'BUNGEE_CURRENCIES'
    | 'BUNGEE_INDICES'
    | 'COMMODITIES'
    | 'CURRENCIES'
    | 'INDICES'
    | 'KNOCKOUTS_COMMODITIES'
    | 'KNOCKOUTS_CURRENCIES'
    | 'KNOCKOUTS_INDICES'
    | 'KNOCKOUTS_SHARES'
    | 'OPT_COMMODITIES'
    | 'OPT_CURRENCIES'
    | 'OPT_INDICES'
    | 'OPT_RATES'
    | 'OPT_SHARES'
    | 'RATES'
    | 'SECTORS'
    | 'SHARES'
    | 'SPRINT_MARKET'
    | 'TEST_MARKET'
    | 'UNKNOWN'

export type TradeUnit = 'AMOUNT' | 'CONTRACTS' | 'SHARES'

export interface TimeRange {
    openTime: string
    closeTime: string
}

export interface MarketRolloverDetails {
    lastRolloverTime: string
    rolloverInfo: string
}

export interface MarketExpiryDetails {
    lastDealingDate: string
    settlementInfo: string
}

export interface Currency {
    baseExchangeRate: number
    code: string
    exchangeRate: number
    isDefault: boolean
    symbol: string
}

export interface MarginDepositBand {
    currency: string
    margin: number
    max: number
    min: number
}

export interface Snapshot {
    bid: number
    binaryOdds: number
    controlledRiskExtraSpread: number
    decimalPlacesFactor: number
    delayTime: number
    high: number
    low: number
    marketStatus: MarketStatus
    netChange: number
    offer: number
    percentageChange: number
    scalingFactor: number
    updateTime: string
}

export type MarketStatus = 'CLOSED' | 'EDITS_ONLY' | 'OFFLINE' | 'ON_AUCTION' | 'ON_AUCTION_NO_EDITS' | 'SUSPENDED' | 'TRADEABLE'
/* MarketDetails - End */

/* Price Request - Start */
export interface PriceRequest {
    epic: string
    resolution?: PriceResolution
    /** Limits the number of price points (not applicable if a date range [from, to] has been specified) (Default = 10) */
    max?: number
    /** Page size (disable paging = 0) (Default = 20) */
    pageSize?: number
    /** Page number (Default = 1) */
    pageNumber?: number
    /** DateTime Format: yyyy-MM-dd'T'HH:mm:ss */
    from?: string
    /** DateTime Format: yyyy-MM-dd'T'HH:mm:ss */
    to?: string
}
/* Price Request - End*/

export type PriceResolution =
    | 'DAY'
    | 'HOUR'
    | 'HOUR_2'
    | 'HOUR_3'
    | 'HOUR_4'
    | 'MINUTE'
    | 'MINUTE_10'
    | 'MINUTE_15'
    | 'MINUTE_2'
    | 'MINUTE_3'
    | 'MINUTE_30'
    | 'MINUTE_5'
    | 'MONTH'
    | 'SECOND'
    | 'WEEK'

/* Price Response - Start */
export interface PriceResponse {
    instrumentType: InstrumentType
    metadata: Metadata
    prices: Price[]
}

export interface Metadata {
    allowance: Allowance
    pageData: PageData
    size: number
}

export interface Allowance {
    allowanceExpiry: number
    remainingAllowance: number
    totalAllowance: number
}

export interface PageData {
    pageNumber: number
    pageSize: number
    totalPages: number
}

export interface Candlestick {
    closePrice: PriceTick
    highPrice: PriceTick
    /** Last traded price. This will generally be null for non exchange-traded instruments */
    lastTradedVolume: number
    lowPrice: PriceTick
    openPrice: PriceTick
    /** Snapshot local time, format is yyyy/MM/dd hh:mm:ss */
    snapshotTime: string
    snapshotTimeUTC: string
}

export interface PriceTick {
    ask: number
    bid: number
    lastTraded: number
}
/* Price Response - End */

/* Watchlist - Start */
export interface Watchlist {
    id: string
    name: string
    /** True if this watchlist can be altered by the user */
    editable: boolean
    /** True if this watchlist can be deleted by the user */
    deleteable: boolean
    /** True if this watchlist doesn't belong to the user, but rather is a system predefined one */
    defaultSystemWatchlist: boolean
}
/* Watchlist - End */

export interface CreateWatchlistRequest {
    name: string
    epics: string[]
}

export interface CreateWatchlistResponse {
    status: 'SUCCESS' | 'SUCCESS_NOT_ALL_INSTRUMENTS_ADDED'
    /** identifier of the watchlist just created, if successful */
    watchlistId: string
}
