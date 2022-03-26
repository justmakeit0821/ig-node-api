# ig-node-api

**A Node.js library for [IG Trading API](https://labs.ig.com/gettingstarted).**

## Installation
```shell
npm i ig-node-api
```

## Getting Started
### Login
You need to login first before accessing the REST APIs and the STREAM APIs.
```js
import IG, { API_BASE_URL } from 'ig-node-api'

async function main() {
    const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY, API_BASE_URL.DEMO)
    const session = await myIg.login()
    console.log(session)
}
main()
```
After `login()`, OAuth Tokens (Access Token & Refresh Token) will be **auto refreshed before expiry**.

Besides, you can manually refresh the OAuth Tokens:
```js
import IG, { API_BASE_URL } from 'ig-node-api'

async function main() {
    const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY, API_BASE_URL.DEMO)
    const session = await myIg.login()
    console.log(session)

    // ...

    const oauthTokens = await myIg.refreshOauthTokens()
    console.log('oauthTokens:', oauthTokens)
}
main()
```

### Logout
After logout, you can no longer access the REST APIs and the STREAM APIs.
```js
import IG, { API_BASE_URL, parseAxiosError } from 'ig-node-api'

async function main() {
    try {
        const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY, API_BASE_URL.DEMO)
        const session = await myIg.login()
        console.log(session)

        // ...

        await myIg.logout()

        const marketCategories = await myIg.getMarketCategories()
        console.log(marketCategories)
    } catch (err) {
        console.error(parseAxiosError(err))
    }
}
main()
```

Above sample code will lead to below error as it tries to `getMarketCategories()` after `logout()`:
```json
{
    "failed": true,
    "request": {
        "method": "get",
        "url": "https://demo-api.ig.com/gateway/deal/marketnavigation",
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "X-IG-API-KEY": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "IG-ACCOUNT-ID": "",
            "Authorization": "Bearer ",
            "User-Agent": "axios/0.25.0"
        },
        "data": null
    },
    "situation": "Request made and server responded.",
    "status": 401,
    "statusText": "Unauthorized",
    "data": { "errorCode": "error.security.client-token-missing" }
}
```

### Rest APIs
#### Get Market Related Information
```js
import IG, { API_BASE_URL } from 'ig-node-api'

async function main() {
    const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY, API_BASE_URL.DEMO)
    const session = await myIg.login()
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
}
main()
```

#### Retrieve Historical Price Points For A Given Epic
```js
import IG, { API_BASE_URL } from 'ig-node-api'

async function main() {
    const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY, API_BASE_URL.DEMO)
    const session = await myIg.login()
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
}
main()
```

#### Manipulate Watchlist
```js
import IG, { API_BASE_URL } from 'ig-node-api'

async function main() {
    const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY, API_BASE_URL.DEMO)
    const session = await myIg.login()
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
}
main()
```

#### Execute Trades
```js
import IG, { API_BASE_URL } from 'ig-node-api'

async function main() {
    const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY, API_BASE_URL.DEMO)
    const session = await myIg.login()
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
}
main()
```

#### View Account Details
```js
import IG, { API_BASE_URL } from 'ig-node-api'

async function main() {
    const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY, API_BASE_URL.DEMO)

    const accountDetails = await myIg.getAccountDetails()
    console.log(JSON.stringify(accountDetails, null, 4))
}
main()
```

#### View Activity History
```js
import IG, { API_BASE_URL } from 'ig-node-api'

async function main() {
    const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY, API_BASE_URL.DEMO)
    const session = await myIg.login()
    console.log(session)

    const activityHistory = await myIg.getActivityHistory({ from: '2022-01-01T00:00:00', detailed: true })
    console.log(activityHistory)
}
main()
```

#### View Transaction History
```js
import IG, { API_BASE_URL } from 'ig-node-api'

async function main() {
    const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY, API_BASE_URL.DEMO)
    const session = await myIg.login()
    console.log(session)

    const transactionHistory = await myIg.getTransactionHistory({ maxSpanSeconds: 600000 })
    console.log(transactionHistory)
}
main()
```

### STREAM APIs
#### Connect To Lightstreamer Server
```js
import IG, { API_BASE_URL } from 'ig-node-api'

async function main() {
    const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY, API_BASE_URL.DEMO)
    const session = await myIg.login()
    console.log(session)

    const lsClient = myIg.connectLightstreamer()
}
main()
```

#### Subscribe Candlestick Changes
```js
import IG, { API_BASE_URL, constructCandleSubscription, Scale, CandleField, Candle } from 'ig-node-api'

async function main() {
    const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY, API_BASE_URL.DEMO)
    const session = await myIg.login()
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
}
main()
```

#### Subscribe Trade Related Updates
```js
import IG, { API_BASE_URL, constructTradeSubscription, TradeConfirmation, OpenPositionUpdate } from 'ig-node-api'

async function main() {
    const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY, API_BASE_URL.DEMO)
    const session = await myIg.login()
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
}
main()
```

## License
MIT
