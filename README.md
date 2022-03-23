# ig-node-api

**A Node.js library for [IG Trading API](https://labs.ig.com/gettingstarted).**

## Installation
```shell
npm i ig-node-api
```

## Getting Started
### Authentication
You need to authenticate first before accessing the REST APIs and the STREAM APIs.

```js
import IG from 'ig-node-api'

const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY)
const session = await myIg.authenticate()
console.log(session)
```

### Rest APIs
#### Get Market Related Information
```js
import IG from 'ig-node-api'

const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY)
const session = await myIg.authenticate()
console.log(session)

const markets = await myIg.searchEpics('us30')
console.log(markets[0])

const marketCategories = await myIg.getMarketCategories()
console.log(marketCategories)

const marketSubCategories = await myIg.getMarketSubCategories('97606')
console.log(marketSubCategories)

const marketDetails = await myIg.getMarketsDetails(['IX.D.DOW.IFD.IP', 'IX.D.SPTRD.IFA.IP'])
console.log(marketDetails)

const marketDetail = await myIg.getMarketDetails('IX.D.DOW.IFD.IP')
console.log(marketDetail)
```

#### Retrieve Historical Price Points For A Given Epic
```js
import IG from 'ig-node-api'

const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY)
const session = await myIg.authenticate()
console.log(session)

const prices = await myIg.getPrices({
    epic: 'IX.D.DOW.IFD.IP',
    resolution: 'DAY',
    max: 6,
    pageSize: 0,
    pageNumber: 1,
    from: '2022-01-01T00:00:00',
    to: '2022-01-06T00:00:00'
})
console.log(prices)
```

#### Manipulate Watchlist
```js
import IG from 'ig-node-api'

const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY)
const session = await myIg.authenticate()
console.log(session)

const watchlistCreateResult = await myIg.createWatchlist({
    name: `My Watchlist`,
    epics: ['IX.D.DOW.IFD.IP', 'IX.D.SPTRD.IFA.IP', 'CS.D.BITCOIN.CFD.IP']
})
console.log(watchlistCreateResult)

const watchlists = await myIg.getWatchlists()
console.log(watchlists)

const watchlistDeatil = await myIg.getWatchlistDetail('16906012')
console.log(watchlistDeatil)

const watchlistDeleteResult = await myIg.deleteWatchlist('16906012')
console.log(watchlistDeleteResult)
```

#### Execute Trades
```js
import IG from 'ig-node-api'

const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY)
const session = await myIg.authenticate()
console.log(session)

const createPositionResponse = await myIg.createOtcPosition({
    epic: 'CS.D.BITCOIN.CFD.IP',
    direction: 'BUY',
    orderType: 'MARKET',
    size: 3,
    forceOpen: true,
    guaranteedStop: false,
    currencyCode: 'USD',
    expiry: '-'
})
console.log(createPositionResponse)

const dealStatus = await myIg.checkDealStatus(createPositionResponse.dealReference)
console.log(dealStatus)

const closePositionResponse = await myIg.closeOtcPosition({
    dealId: 'DIAAAAHT7EGREC6',
    direction: 'SELL',
    size: 0.1,
    orderType: 'MARKET'
})
console.log('closePositionResponse:', closePositionResponse)

const openPositions = await myIg.getOpenPositions()
console.log(JSON.stringify(openPositions, null, 4))

const anOpenPosition = await myIg.getOpenPosition('DIAAAAHT7EGREC6')
console.log(JSON.stringify(anOpenPosition, null, 4))
```

#### View Account Details
```js
import IG from 'ig-node-api'

const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY)

const accountDetails = await myIg.getAccountDetails()
console.log(JSON.stringify(accountDetails, null, 4))
```

#### View Activity History
```js
import IG from 'ig-node-api'

const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY)
const session = await myIg.authenticate()
console.log(session)

const activityHistory = await myIg.getActivityHistory({ from: '2022-01-01T00:00:00', detailed: true })
console.log(activityHistory)
```

#### View Transaction History
```js
import IG from 'ig-node-api'

const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY)
const session = await myIg.authenticate()
console.log(session)

const transactionHistory = await myIg.getTransactionHistory({ maxSpanSeconds: 600000 })
console.log(transactionHistory)
```

### STREAM APIs
#### Connect To Lightstreamer Server
```js
import IG from 'ig-node-api'

const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY)
const session = await myIg.authenticate()
console.log(session)

const lsClient = myIg.connectLightstreamer()
```

#### Subscribe Candlestick Changes
```js
import IG, { constructCandleSubscription, Scale, CandleField, Candle } from 'ig-node-api'

const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY)
const session = await myIg.authenticate()
console.log(session)

const lsClient = myIg.connectLightstreamer()

const candleSubscription = constructCandleSubscription(
    ['CS.D.BITCOIN.CFD.IP'],
    Scale['1MINUTE'],
    Object.values(CandleField),
    (epic: string, data: Candle) => {
        data.UTM = new Date(Number(data.UTM)).toLocaleString()
        console.log(epic, data)
    }
)
lsClient.subscribe(candleSubscription)
```

#### Subscribe Trade Related Updates
```js
import IG, { constructTradeSubscription, TradeConfirmation, OpenPositionUpdate } from 'ig-node-api'

const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY)
const session = await myIg.authenticate()
console.log(session)

const lsClient = myIg.connectLightstreamer()

const tradeSubscription = constructTradeSubscription(
    session.accountId,
    ['CONFIRMS', 'OPU', 'WOU'],
    (tradeUpdates: { CONFIRMS: TradeConfirmation, OPU: OpenPositionUpdate, WOU: any }) => {
        console.log(tradeUpdates)
    }
)
lsClient.subscribe(tradeSubscription)
```

## License
MIT