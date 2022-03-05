/*
What are the Prod/Demo base URLs?
- DEMO: https://demo-api.ig.com/gateway/deal
- PROD: https://api.ig.com/gateway/deal

Source: https://labs.ig.com/faq
*/
export const API_BASE_URL = {
    DEMO: 'https://demo-api.ig.com/gateway/deal',
    PROD: 'https://api.ig.com/gateway/deal'
}

// Ref: https://labs.ig.com/streaming-api-reference
export enum CandleField {
    LTV = 'LTV', // Last traded volume
    TTV = 'TTV', // Incremental volume
    UTM = 'UTM', // Update time (as milliseconds from the Epoch)
    DAY_OPEN_MID = 'DAY_OPEN_MID', // Mid open price for the day
    DAY_NET_CHG_MID = 'DAY_NET_CHG_MID', // Change from open price to current (MID price)
    DAY_PERC_CHG_MID = 'DAY_PERC_CHG_MID', // Daily percentage change (MID price)
    DAY_HIGH = 'DAY_HIGH', // Daily high price (MID)
    DAY_LOW = 'DAY_LOW', // Daily low price (MID)
    OFR_OPEN = 'OFR_OPEN', // Candle open price (OFR)
    OFR_HIGH = 'OFR_HIGH', // Candle high price (OFR)
    OFR_LOW = 'OFR_LOW', // Candle low price (OFR)
    OFR_CLOSE = 'OFR_CLOSE', // Candle close price (OFR)
    BID_OPEN = 'BID_OPEN', // Candle open price (BID)
    BID_HIGH = 'BID_HIGH', // Candle high price (BID)
    BID_LOW = 'BID_LOW', // Candle low price (BID)
    BID_CLOSE = 'BID_CLOSE', // Candle close price (BID)
    LTP_OPEN = 'LTP_OPEN', // Candle open price (Last Traded Price)
    LTP_HIGH = 'LTP_HIGH', // Candle high price (Last Traded Price)
    LTP_LOW = 'LTP_LOW', // Candle low price (Last Traded Price)
    LTP_CLOSE = 'LTP_CLOSE', // Candle close price (Last Traded Price)
    CONS_END = 'CONS_END', // 1 when candle ends, otherwise 0
    CONS_TICK_COUNT = 'CONS_TICK_COUNT' // Number of ticks in candle
}

export enum Scale {
    'SECOND' = 'SECOND',
    '1MINUTE' = '1MINUTE',
    '5MINUTE' = '5MINUTE',
    'HOUR' = 'HOUR'
}

export enum MarketDetailsFilterType {
    /** Display all market details. Market details includes all instrument data, dealing rules and market snapshot values for all epics specified. */
    ALL = 'ALL',
    /** Display the market snapshot and minimal instrument data fields. This mode is faster because it only sets the epic and instrument type in the instrument data and the market data snapshot values with all the other fields being unset for each epic specified. */
    SNAPSHOT_ONLY = 'SNAPSHOT_ONLY'
}
