import IG from './IG'
import { API_BASE_URL, CandleField, Scale, MarketDetailsFilterType } from './constant'
import { constructCandleSubscription, constructTradeSubscription } from './stream/'
import {
    OauthToken,
    Session,
    Market,
    MarketCategory,
    SecurityTokens,
    Candle,
    MarketDetail,
    DealingRules,
    MarketOrderPreference,
    TrailingStopsPreference,
    DealingRule,
    Unit,
    Instrument,
    InstrumentType,
    TradeUnit,
    TimeRange,
    MarketRolloverDetails,
    MarketExpiryDetails,
    Currency,
    MarginDepositBand,
    Snapshot,
    MarketStatus,
    PriceRequest,
    PriceResolution,
    PriceResponse,
    Metadata,
    Allowance,
    PageData,
    Candlestick,
    PriceTick,
    Watchlist,
    CreateWatchlistRequest,
    CreateWatchlistResponse,
    CreatePositionRequest,
    DealDirection,
    OrderType,
    Expiry,
    TimeInForce,
    CreatePositionResponse,
    CheckDealStatusResponse,
    Deal,
    AffectedDealStatus,
    DealStatus,
    PositionStatus,
    DealConfirmRejectReason,
    ClosePositionRequest,
    ClosePositionResponse,
    Position,
    TransactionHistoryRequest,
    TransactionType,
    Transaction,
    TransactionHistoryResponse,
    Account,
    Balance,
    AccountType,
    AccountStatus,
    ActivityHistoryRequest,
    ActivityHistoryResponse,
    Activity,
    ActivityDetails,
    Action,
    ActivityChannel,
    ActionType,
    ActionStatus,
    ActivityType,
    Paging,
    TradeSubscriptionField,
    TradeConfirmation,
    OpenPositionUpdate,
    OpenPositionUpdateStatus,
    OpenPositionUpdateTimeInForce
} from './@types'
import { parseAxiosError } from './rest/parse-axios-error'

export default IG
export { constructCandleSubscription, constructTradeSubscription }
export { API_BASE_URL, CandleField, Scale, MarketDetailsFilterType }
export {
    OauthToken,
    Session,
    Market,
    MarketCategory,
    SecurityTokens,
    Candle,
    MarketDetail,
    DealingRules,
    MarketOrderPreference,
    TrailingStopsPreference,
    DealingRule,
    Unit,
    Instrument,
    InstrumentType,
    TradeUnit,
    TimeRange,
    MarketRolloverDetails,
    MarketExpiryDetails,
    Currency,
    MarginDepositBand,
    Snapshot,
    MarketStatus,
    PriceRequest,
    PriceResolution,
    PriceResponse,
    Metadata,
    Allowance,
    PageData,
    Candlestick,
    PriceTick,
    Watchlist,
    CreateWatchlistRequest,
    CreateWatchlistResponse,
    CreatePositionRequest,
    DealDirection,
    OrderType,
    Expiry,
    TimeInForce,
    CreatePositionResponse,
    CheckDealStatusResponse,
    Deal,
    AffectedDealStatus,
    DealStatus,
    PositionStatus,
    DealConfirmRejectReason,
    ClosePositionRequest,
    ClosePositionResponse,
    Position,
    TransactionHistoryRequest,
    TransactionType,
    Transaction,
    TransactionHistoryResponse,
    Account,
    Balance,
    AccountType,
    AccountStatus,
    ActivityHistoryRequest,
    ActivityHistoryResponse,
    Activity,
    ActivityDetails,
    Action,
    ActivityChannel,
    ActionType,
    ActionStatus,
    ActivityType,
    Paging,
    TradeSubscriptionField,
    TradeConfirmation,
    OpenPositionUpdate,
    OpenPositionUpdateStatus,
    OpenPositionUpdateTimeInForce
}
export { parseAxiosError }
