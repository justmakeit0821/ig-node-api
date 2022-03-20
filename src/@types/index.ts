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
    prices: Candlestick[]
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

/* Create Position Request - Start */
/**
 * ## Limit Constraints
 * 1. Set only one of {`limitLevel`, `limitDistance`}.
 * 2. If a `limitLevel` is set, then `forceOpen` must be `true`.
 * 3. If a `limitDistance` is set, then `forceOpen` must be `true`.
 *
 * ## Stop Constraints
 * 1. Set only one of {`stopLevel`, `stopDistance`}.
 * 2. If a `stopLevel` is set, then `forceOpen` must be `true`.
 * 3. If a `stopDistance` is set, then `forceOpen` must be `true`.
 * 4. If `guaranteedStop` equals `true`, then set only one of {`stopLevel`, `stopDistance`}.
 *
 * ## Order Type Constraints
 * 1. If `orderType` equals "LIMIT", then set `level`.
 * 2. If `orderType` equals "LIMIT", then do not set `quoteId`.
 * 3. If `orderType` equals "MARKET", then do not set `level` and `quoteId`.
 * 4. If `orderType` equals "QUOTE", then set `level` and `quoteId`.
 *
 * ## Trailing Stop Constraints
 * 1. If `trailingStop` equals `false`, then do not set `trailingStopIncrement`.
 * 2. If `trailingStop` equals `true`, then do not set `stopLevel`.
 * 3. If `trailingStop` equals `true`, then `guaranteedStop` must be `false`.
 * 4. If `trailingStop` equals `true`, then set `stopDistance`, `trailingStopIncrement`.
 */
export interface CreatePositionRequest {
    /** Constraint: Pattern(regexp="[A-Za-z0-9._]{6,30}") */
    epic: string
    direction: DealDirection
    orderType: OrderType
    /** deal size */
    size: number
    forceOpen: boolean
    guaranteedStop: boolean
    /** Constraint: Pattern(regexp="[A-Z]{3}") */
    currencyCode: CurrencyCode
    /** Constraint: Pattern(regexp="(\\d{2}-)?[A-Z]{3}-\\d{2}|-|DFB") */
    expiry: Expiry

    /** instrument price */
    level?: number
    limitLevel?: number
    limitDistance?: number

    stopLevel?: number
    stopDistance?: number
    /** Whether the stop has to be moved towards the current level in case of a favourable trade. */
    trailingStop?: boolean
    /** Increment step in pips for the trailing stop. */
    trailingStopIncrement?: number

    timeInForce?: TimeInForce
    /** Lightstreamer price quote identifier */
    quoteId?: string
    /** A user-defined reference identifying the submission of the order, Constraint: Pattern(regexp="[A-Za-z0-9_\\-]{1,30}") */
    dealReference?: string
}

export type DealDirection = 'BUY' | 'SELL'

export type CurrencyCode = 'AUD' | 'USD' | 'GBP' | 'EUR' | 'CHF'

/**
 * LIMIT: Limit orders get executed at the price seen by IG at the moment of booking a trade. A limit determines the level at which the order or the remainder of the order will be rejected. <br/>
 *
 * MARKET: Market orders get executed at the price seen by the IG at the time of booking the trade. A level cannot be specified. Not applicable to BINARY instruments. <br/>
 *
 export * QUOTE: Quote orders get executed at the specified level. The level has to be accompanied by a valid quote id. This type is only available subject to agreement with IG.
 */
export type OrderType = 'LIMIT' | 'MARKET' | 'QUOTE'

export type Expiry = '-' | 'DFB' | string

export type TimeInForce = 'EXECUTE_AND_ELIMINATE' | 'FILL_OR_KILL'
/* Create Position Request - End */

/* Create Position Response - Start */
export interface CreatePositionResponse {
    dealReference: string
}
/* Create Position Request - End */

/* CheckDealStatusResponse - Start */
export interface CheckDealStatusResponse {
    affectedDeals: Deal[]
    date: string
    dealId: string
    dealReference: string
    dealStatus: DealStatus
    direction: DealDirection
    epic: string
    expiry: string
    guaranteedStop: boolean
    level: number
    limitLevel: number
    limitDistance: number
    profit: number
    profitCurrency: string
    reason: DealConfirmRejectReason
    size: number
    status: PositionStatus
    stopLevel: number
    stopDistance: number
    trailingStop: boolean
}

export interface Deal {
    dealId: string
    status: AffectedDealStatus
}

export type AffectedDealStatus = 'AMENDED' | 'DELETED' | 'FULLY_CLOSED' | 'OPENED' | 'PARTIALLY_CLOSED'

export type DealStatus = 'ACCEPTED' | 'REJECTED'

export type PositionStatus = 'AMENDED' | 'CLOSED' | 'DELETED' | 'OPEN' | 'PARTIALLY_CLOSED'

/**
 * - ACCOUNT_NOT_ENABLED_TO_TRADING: The account is not enabled to trade
 * - ATTACHED_ORDER_LEVEL_ERROR: The level of the attached stop or limit is not valid
 * - ATTACHED_ORDER_TRAILING_STOP_ERROR: The trailing stop value is invalid
 * - CANNOT_CHANGE_STOP_TYPE: Cannot change the stop type.
 * - CANNOT_REMOVE_STOP: Cannot remove the stop.
 * - CLOSING_ONLY_TRADES_ACCEPTED_ON_THIS_MARKET: We are not taking opening deals on a Controlled Risk basis on this - market
 * - CLOSINGS_ONLY_ACCOUNT: You are currently restricted from opening any new positions on your account.
 * - CONFLICTING_ORDER: Resubmitted request does not match the original order.
 * - CONTACT_SUPPORT_INSTRUMENT_ERROR: Instrument has an error - check the order's currency is the instrument's - currency (see the market's details); otherwise please contact support.
 * - CR_SPACING: Sorry we are unable to process this order. The stop or limit level you have requested is not a - valid trading level in the underlying market.
 * - DUPLICATE_ORDER_ERROR: The order has been rejected as it is a duplicate of a previously issued order
 * - EXCHANGE_MANUAL_OVERRIDE: Exchange check failed. Please call in for assistance.
 * - EXPIRY_LESS_THAN_SPRINT_MARKET_MIN_EXPIRY: Order expiry is less than the sprint market's minimum expiry. - Check the sprint market's market details for the allowable expiries.
 * - FINANCE_REPEAT_DEALING: The total size of deals placed on this market in a short period has exceeded our - limits. Please wait before attempting to open further positions on this market.
 * - FORCE_OPEN_ON_SAME_MARKET_DIFFERENT_CURRENCY: Ability to force open in different currencies on same market - not allowed
 * - GENERAL_ERROR: an error has occurred but no detailed information is available. Check transaction history or - contact support for further information
 * - GOOD_TILL_DATE_IN_THE_PAST: The working order has been set to expire on a past date
 * - INSTRUMENT_NOT_FOUND: The requested market was not found
 * - INSTRUMENT_NOT_TRADEABLE_IN_THIS_CURRENCY: Instrument not tradeable in this currency.
 * - INSUFFICIENT_FUNDS: The account has not enough funds available for the requested trade
 * - LEVEL_TOLERANCE_ERROR: The market level has moved and has been rejected
 * - LIMIT_ORDER_WRONG_SIDE_OF_MARKET: The deal has been rejected because the limit level is inconsistent with - current market price given the direction.
 * - MANUAL_ORDER_TIMEOUT: The manual order timeout limit has been reached
 * - MARGIN_ERROR: Order declined during margin checks Check available funds.
 * - MARKET_CLOSED: The market is currently closed
 * - MARKET_CLOSED_WITH_EDITS: The market is currently closed with edits
 * - MARKET_CLOSING: The epic is due to expire shortly, client should deal in the next available contract.
 * - MARKET_NOT_BORROWABLE: The market does not allow opening shorting positions
 * - MARKET_OFFLINE: The market is currently offline
 * - MARKET_ORDERS_NOT_ALLOWED_ON_INSTRUMENT: The epic does not support 'Market' order type
 * - MARKET_PHONE_ONLY: The market can only be traded over the phone
 * - MARKET_ROLLED: The market has been rolled to the next period
 * - MARKET_UNAVAILABLE_TO_CLIENT: The requested market is not allowed to this account
 * - MAX_AUTO_SIZE_EXCEEDED: The order size exceeds the instrument's maximum configured value for auto-hedging the - exposure of a deal
 * - MINIMUM_ORDER_SIZE_ERROR: The order size is too small
 * - MOVE_AWAY_ONLY_LIMIT: The limit level you have requested is closer to the market level than the existing - stop. When the market is closed you can only move the limit order further away from the current market level.
 * - MOVE_AWAY_ONLY_STOP: The stop level you have requested is closer to the market level than the existing stop - level. When the market is closed you can only move the stop level further away from the current market level
 * - MOVE_AWAY_ONLY_TRIGGER_LEVEL: The order level you have requested is moving closer to the market level than - the exisiting order level. When the market is closed you can only move the order further away from the current - market level.
 * - NCR_POSITIONS_ON_CR_ACCOUNT: You are not permitted to open a non-controlled risk position on this account.
 * - OPPOSING_DIRECTION_ORDERS_NOT_ALLOWED: Opening CR position in opposite direction to existing CR position not - allowed.
 * - OPPOSING_POSITIONS_NOT_ALLOWED: The deal has been rejected to avoid having long and short open positions on - the same market or having long and short open positions and working orders on the same epic
 * - ORDER_DECLINED: Order declined; please contact Support
 * - ORDER_LOCKED: The order is locked and cannot be edited by the user
 * - ORDER_NOT_FOUND: The order has not been found
 * - ORDER_SIZE_CANNOT_BE_FILLED: The order size cannot be filled at this price at the moment.
 * - OVER_NORMAL_MARKET_SIZE: The total position size at this stop level is greater than the size allowed on this - market. Please reduce the size of the order.
 * - PARTIALY_CLOSED_POSITION_NOT_DELETED: Position cannot be deleted as it has been partially closed.
 * - POSITION_ALREADY_EXISTS_IN_OPPOSITE_DIRECTION: The deal has been rejected because of an existing position. - Either set the 'force open' to be true or cancel opposing position
 * - POSITION_NOT_AVAILABLE_TO_CANCEL: Position cannot be cancelled. Check transaction history or contact support - for further information.
 * - POSITION_NOT_AVAILABLE_TO_CLOSE: Cannot close this position. Either the position no longer exists, or the size - available to close is less than the size specified.
 * - POSITION_NOT_FOUND: The position has not been found
 * - REJECT_CFD_ORDER_ON_SPREADBET_ACCOUNT: Invalid attempt to submit a CFD trade on a spreadbet account
 * - REJECT_SPREADBET_ORDER_ON_CFD_ACCOUNT: Invalid attempt to submit a spreadbet trade on a CFD account
 * - SIZE_INCREMENT: Order size is not an increment of the value specified for the market.
 * - SPRINT_MARKET_EXPIRY_AFTER_MARKET_CLOSE: The expiry of the position would have fallen after the closing time of - the market
 * - STOP_OR_LIMIT_NOT_ALLOWED: The market does not allow stop or limit attached orders
 * - STOP_REQUIRED_ERROR: The order requires a stop
 * - STRIKE_LEVEL_TOLERANCE: The submitted strike level is invalid
 * - SUCCESS: The operation completed successfully
 * - TRAILING_STOP_NOT_ALLOWED: The market or the account do not allow for trailing stops
 * - UNKNOWN: The operation resulted in an unknown result condition. Check transaction history or contact support - for further information
 * - WRONG_SIDE_OF_MARKET: The requested operation has been attempted on the wrong direction
 */
export type DealConfirmRejectReason =
    | 'ACCOUNT_NOT_ENABLED_TO_TRADING'
    | 'ATTACHED_ORDER_LEVEL_ERROR'
    | 'ATTACHED_ORDER_TRAILING_STOP_ERROR'
    | 'CANNOT_CHANGE_STOP_TYPE'
    | 'CANNOT_REMOVE_STOP'
    | 'CLOSING_ONLY_TRADES_ACCEPTED_ON_THIS_MARKET'
    | 'CLOSINGS_ONLY_ACCOUNT'
    | 'CONFLICTING_ORDER'
    | 'CONTACT_SUPPORT_INSTRUMENT_ERROR'
    | 'CR_SPACING'
    | 'DUPLICATE_ORDER_ERROR'
    | 'EXCHANGE_MANUAL_OVERRIDE'
    | 'EXPIRY_LESS_THAN_SPRINT_MARKET_MIN_EXPIRY'
    | 'FINANCE_REPEAT_DEALING'
    | 'FORCE_OPEN_ON_SAME_MARKET_DIFFERENT_CURRENCY'
    | 'GENERAL_ERROR'
    | 'GOOD_TILL_DATE_IN_THE_PAST'
    | 'INSTRUMENT_NOT_FOUND'
    | 'INSTRUMENT_NOT_TRADEABLE_IN_THIS_CURRENCY'
    | 'INSUFFICIENT_FUNDS'
    | 'LEVEL_TOLERANCE_ERROR'
    | 'LIMIT_ORDER_WRONG_SIDE_OF_MARKET'
    | 'MANUAL_ORDER_TIMEOUT'
    | 'MARGIN_ERROR'
    | 'MARKET_CLOSED'
    | 'MARKET_CLOSED_WITH_EDITS'
    | 'MARKET_CLOSING'
    | 'MARKET_NOT_BORROWABLE'
    | 'MARKET_OFFLINE'
    | 'MARKET_ORDERS_NOT_ALLOWED_ON_INSTRUMENT'
    | 'MARKET_PHONE_ONLY'
    | 'MARKET_ROLLED'
    | 'MARKET_UNAVAILABLE_TO_CLIENT'
    | 'MAX_AUTO_SIZE_EXCEEDED'
    | 'MINIMUM_ORDER_SIZE_ERROR'
    | 'MOVE_AWAY_ONLY_LIMIT'
    | 'MOVE_AWAY_ONLY_STOP'
    | 'MOVE_AWAY_ONLY_TRIGGER_LEVEL'
    | 'NCR_POSITIONS_ON_CR_ACCOUNT'
    | 'OPPOSING_DIRECTION_ORDERS_NOT_ALLOWED'
    | 'OPPOSING_POSITIONS_NOT_ALLOWED'
    | 'ORDER_DECLINED'
    | 'ORDER_LOCKED'
    | 'ORDER_NOT_FOUND'
    | 'ORDER_SIZE_CANNOT_BE_FILLED'
    | 'OVER_NORMAL_MARKET_SIZE'
    | 'PARTIALY_CLOSED_POSITION_NOT_DELETED'
    | 'POSITION_ALREADY_EXISTS_IN_OPPOSITE_DIRECTION'
    | 'POSITION_NOT_AVAILABLE_TO_CANCEL'
    | 'POSITION_NOT_AVAILABLE_TO_CLOSE'
    | 'POSITION_NOT_FOUND'
    | 'REJECT_CFD_ORDER_ON_SPREADBET_ACCOUNT'
    | 'REJECT_SPREADBET_ORDER_ON_CFD_ACCOUNT'
    | 'SIZE_INCREMENT'
    | 'SPRINT_MARKET_EXPIRY_AFTER_MARKET_CLOSE'
    | 'STOP_OR_LIMIT_NOT_ALLOWED'
    | 'STOP_REQUIRED_ERROR'
    | 'STRIKE_LEVEL_TOLERANCE'
    | 'SUCCESS'
    | 'TRAILING_STOP_NOT_ALLOWED'
    | 'UNKNOWN'
    | 'WRONG_SIDE_OF_MARKET'

/* CheckDealStatusResponse - End */

/* Close Position Request - Start */
/**
 * ## dealId or epic
 * - Constraint: Set only one of {`dealId`, `epic`}
 * - Constraint: If `epic` is defined, then set `expiry`
 *
 * ## Order Type Constraints
 * - Constraint: If `orderType` equals "LIMIT", then do not set `quoteId`
 * - Constraint: If `orderType` equals "LIMIT", then set `level`
 * - Constraint: If `orderType` equals "MARKET", then do not set {`level`, `quoteId`}
 * - Constraint: If `orderType` equals "QUOTE", then set {`level`, `quoteId`}
 */
export interface ClosePositionRequest {
    /** Constraint: Pattern(regexp=".{1,30}") */
    dealId?: string
    /** Constraint: Pattern(regexp="[A-Za-z0-9._]{6,30}") */
    epic?: string
    /** Constraint: Pattern(regexp="(\\d{2}-)?[A-Z]{3}-\\d{2}|-|DFB") */
    expiry?: string
    direction: DealDirection
    /** deal size */
    size: number
    level?: number
    orderType: OrderType
    timeInForce?: TimeInForce
    quoteId?: string
}
/* Close Position Request - End */

/* Close Position Response - Start */
export interface ClosePositionResponse {
    dealReference: string
}
/* Close Position Request - End */

export interface Position {
    contractSize: number
    controlledRisk: boolean
    createdDate: string
    createdDateUTC: string
    currency: CurrencyCode
    dealId: string
    dealReference: string
    direction: DealDirection
    level: number
    limitLevel: number
    limitedRiskPremium: number
    size: number
    stopLevel: number
    trailingStep: number
    trailingStopDistance: number
}

/* Transaction History Request - Start */
export interface TransactionHistoryRequest {
    /** (Default = ALL) */
    type?: TransactionType
    /** Limits the timespan in seconds through to current time (not applicable if a date range has been specified) */
    maxSpanSeconds?: number
    /** Page size (disable paging = 0) (Default = 20) */
    pageSize?: number
    /** Page number (Default = 1) */
    pageNumber?: number
    /** DateTime Format: yyyy-MM-dd'T'HH:mm:ss */
    from?: string
    /** DateTime Format: yyyy-MM-dd'T'HH:mm:ss */
    to?: string
}
/* Transaction History Request - End */

export type TransactionType = 'ALL' | 'ALL_DEAL' | 'DEPOSIT' | 'WITHDRAWAL'

export interface Transaction {
    /** True if this was a cash transaction */
    cashTransaction: boolean
    /** Level at which the order was closed */
    closeLevel: string
    /** Order currency */
    currency: string
    date: string
    dateUtc: string
    instrumentName: string
    /** Position opened date */
    openDateUtc: string
    /** Level at which the order was opened */
    openLevel: string
    period: string
    profitAndLoss: string
    /** Reference */
    reference: string
    /** Formatted order size, including the direction (+ for buy, - for sell) */
    size: string
    transactionType: string
}

/* Transaction History Response - Start */
export interface TransactionHistoryResponse {
    transactions: Transaction[]
    metadata: {
        size: number
        pageData: PageData
    }
}
/* Transaction History Response - End */

export interface Account {
    accountAlias: string
    accountId: string
    accountName: string
    accountType: AccountType
    balance: Balance
    /** True if account can be transferred to */
    canTransferFrom: boolean
    /** True if account can be transferred from */
    canTransferTo: boolean
    /** Account currency */
    currency: string
    /** True if this the default login account */
    preferred: boolean
    status: AccountStatus
}

export interface Balance {
    /** Amount available for trading */
    available: number
    /** Balance of funds in the account */
    balance: number
    /** Minimum deposit amount required for margins */
    deposit: number
    /** Profit and loss amount */
    profitLoss: number
}

export type AccountType = 'CFD' | 'PHYSICAL' | 'SPREADBET'

export type AccountStatus = 'DISABLED' | 'ENABLED' | 'SUSPENDED_FROM_DEALING'

/* Activity History Request - Start */
export interface ActivityHistoryRequest {
    /** Start date. DateTime Format: yyyy-MM-dd'T'HH:mm:ss */
    from: string
    detailed?: boolean
    /** Page size (min = 10, max = 500, Default = 50) */
    pageSize?: number
    /** Deal ID */
    dealId?: string
    /** FIQL filter (supported operators: ==|!=|,|;) */
    filter?: string
    /** End date. (Default = current time. A date without time component refers to the end of that day.) DateTime Format: yyyy-MM-dd'T'HH:mm:ss */
    to?: string
}
/* Activity History Request - End */

/* Activity History Response - Start */
export interface ActivityHistoryResponse {
    activities: Activity[]
    metadata: { paging: Paging }
}
export interface Activity {
    /** The channel which triggered the activity. */
    channel: ActivityChannel
    /** The date of the activity item */
    date: string
    dealId: string
    /** Activity description */
    description: string
    details: ActivityDetails
    epic: string
    /** The period of the activity item, e.g., "DFB" or "02-SEP-11". This will be the expiry time/date for sprint markets, e.g., "2015-10-13T12:42:05" */
    period: string
    status: ActionStatus
    type: ActivityType
}

export interface ActivityDetails {
    actions: Action[]
    currency: string
    dealReference: string
    direction: DealDirection
    goodTillDate: string
    guaranteedStop: boolean
    level: number
    limitLevel: number
    limitDistance: number
    marketName: string
    size: number
    stopLevel: number
    stopDistance: number
    trailingStep: number
    trailingStopDistance: number
}

export interface Action {
    actionType: ActionType
    affectedDealId: string
}

export type ActivityChannel = 'DEALER' | 'MOBILE' | 'PUBLIC_FIX_API' | 'PUBLIC_WEB_API' | 'SYSTEM' | 'WEB'

export type ActionType =
    | 'LIMIT_ORDER_AMENDED'
    | 'LIMIT_ORDER_DELETED'
    | 'LIMIT_ORDER_FILLED'
    | 'LIMIT_ORDER_OPENED'
    | 'LIMIT_ORDER_ROLLED'
    | 'POSITION_CLOSED'
    | 'POSITION_DELETED'
    | 'POSITION_OPENED'
    | 'POSITION_PARTIALLY_CLOSED'
    | 'POSITION_ROLLED'
    | 'STOP_LIMIT_AMENDED'
    | 'STOP_ORDER_AMENDED'
    | 'STOP_ORDER_DELETED'
    | 'STOP_ORDER_FILLED'
    | 'STOP_ORDER_OPENED'
    | 'STOP_ORDER_ROLLED'
    | 'UNKNOWN'
    | 'WORKING_ORDER_DELETED'

export type ActionStatus = 'ACCEPTED' | 'REJECTED' | 'UNKNOWN'

export type ActivityType = 'EDIT_STOP_AND_LIMIT' | 'POSITION' | 'SYSTEM' | 'WORKING_ORDER'

export interface Paging {
    /** Next page, e.g., "/history/activity?version=3&from=2022-01-01T00:00:00&to=2022-03-06T09:04:29&detailed=true&pageSize=50" */
    next: string
    /** Page size */
    size: number
}
/* Activity History Response - End */

/**
 * - CONFIRMS: Trade confirmations for an account
 * - OPU: Open position updates for an account
 * - WOU: Working order updates for an account
 */
export type TradeSubscriptionField = 'CONFIRMS' | 'OPU' | 'WOU'

export interface TradeConfirmation {
    affectedDeals: Deal[]
    channel: string
    date: string
    dealId: string
    dealReference: string
    dealStatus: DealStatus
    direction: DealDirection
    epic: string
    expiry: string
    guaranteedStop: boolean
    level: number
    limitLevel: number
    limitDistance: number
    profit: number
    profitCurrency: string
    reason: string
    size: number
    /** Resultant position or working order status */
    status: PositionStatus
    stopLevel: number
    stopDistance: number
    trailingStop: boolean
}

export interface OpenPositionUpdate {
    channel: string
    currency: string
    dealId: string
    dealIdOrigin: string
    dealReference: string
    dealStatus: DealStatus
    direction: DealDirection
    epic: string
    expiry: string
    goodTillDate: string
    guaranteedStop: boolean
    level: number
    limitLevel: number
    limitDistance: number
    orderType: string
    size: number
    status: OpenPositionUpdateStatus
    stopLevel: number
    stopDistance: number
    timeInForce: OpenPositionUpdateTimeInForce
    timestamp: string
    trailingStopDistance: number
    trailingStep: number
}

export type OpenPositionUpdateStatus = 'OPEN' | 'UPDATED' | 'DELETED'

export type OpenPositionUpdateTimeInForce = 'GOOD_TILL_CANCELLED' | 'GOOD_TILL_DATE'
