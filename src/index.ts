import IG from './IG'
import { API_BASE_URL, CandleField, Scale, MarketDetailsFilterType } from './constant'
import { constructCandleSubscription, constructTradeSubscription } from './stream/'

export default IG
export { constructCandleSubscription, constructTradeSubscription }
export { API_BASE_URL, CandleField, Scale, MarketDetailsFilterType }
