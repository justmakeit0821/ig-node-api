import IG, { constructCandleSubscription, constructTradeSubscription, CandleField, Scale, API_BASE_URL, parseAxiosError } from '../src/'
import { Candle, OpenPositionUpdate, TradeConfirmation } from '../src/@types'
import { onAppShutodwn } from './exception-handler'

async function main() {
    try {
        const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY, API_BASE_URL.DEMO)
        /* Test REST APIs */
        let session = await myIg.login()
        console.log('session:', session)

        const markets = await myIg.searchEpics('us30')
        console.log(markets[0])

        const oauthTokens = await myIg.refreshOauthTokens()
        console.log('oauthTokens:', oauthTokens)

        // await myIg.logout()

        const marketCategories = await myIg.getMarketCategories()
        console.log(marketCategories)

        // const marketSubCategories = await myIg.getMarketSubCategories('97606')
        // console.log(marketSubCategories)

        // const marketDetails = await myIg.getMarketsDetails(['IX.D.DOW.IFD.IP', 'IX.D.SPTRD.IFA.IP'])
        // console.dir(marketDetails)

        const marketDetail = await myIg.getMarketDetails('IX.D.DOW.IFD.IP')
        console.dir(marketDetail)

        // const prices = await myIg.getPrices({
        //     epic: 'IX.D.DOW.IFD.IP',
        //     resolution: 'DAY',
        //     max: 6,
        //     pageSize: 0,
        //     pageNumber: 1,
        //     from: '2022-01-01T00:00:00',
        //     to: '2022-01-06T00:00:00'
        // })
        // console.log(prices)

        // const watchlistCreateResult = await myIg.createWatchlist({
        //     name: `My Dear Babe's Watchlist`,
        //     epics: ['IX.D.DOW.IFD.IP', 'IX.D.SPTRD.IFA.IP', 'CS.D.BITCOIN.CFD.IP']
        // })
        // console.log(watchlistCreateResult)

        // const watchlists = await myIg.getWatchlists()
        // console.log(watchlists)

        // const watchlistDeatil = await myIg.getWatchlistDetail('16906317')
        // console.log(watchlistDeatil)

        // const watchlistDeleteResult = await myIg.deleteWatchlist('16906317')
        // console.log(watchlistDeleteResult)

        // const createPositionResponse = await myIg.createOtcPosition({
        //     epic: 'CS.D.BITCOIN.CFD.IP',
        //     direction: 'BUY',
        //     orderType: 'MARKET',
        //     size: 3,
        //     forceOpen: true,
        //     guaranteedStop: false,
        //     currencyCode: 'USD',
        //     expiry: '-'

        //     // level: 1,
        //     // limitLevel: 1,
        //     // limitDistance: 1,

        //     // stopLevel: 1,
        //     // stopDistance: 1,
        //     // trailingStopIncrement: 1,
        //     // trailingStop: false,

        //     // timeInForce: 'FILL_OR_KILL'
        //     // quoteId: '',
        //     // dealReference: 'Hello_Bitcoin8'
        // })
        // console.log(createPositionResponse)

        // const dealStatus = await myIg.checkDealStatus(createPositionResponse.dealReference)
        // console.log(dealStatus)

        // const closePositionResponse = await myIg.closeOtcPosition({
        //     dealId: 'DIAAAAHT5EG3KA5',
        //     direction: 'SELL',
        //     size: 0.1,
        //     orderType: 'MARKET'
        // })
        // console.log('closePositionResponse:', closePositionResponse)

        // const openPositions = await myIg.getOpenPositions()
        // console.log(JSON.stringify(openPositions, null, 4))

        // const anOpenPosition = await myIg.getOpenPosition('DIAAAAHT5EG3KA5')
        // console.log(JSON.stringify(anOpenPosition, null, 4))

        // const accountDetails = await myIg.getAccountDetails()
        // console.log(JSON.stringify(accountDetails, null, 4))

        // const activityHistory = await myIg.getActivityHistory({ from: '2022-01-01T00:00:00', detailed: true })
        // console.log(activityHistory)

        // const transactionHistory = await myIg.getTransactionHistory({ maxSpanSeconds: 600000 })
        // console.log(transactionHistory)

        /* Test Streaming APIs */
        const lsClient = myIg.connectLightstreamer()
        /* Subscribe Candle changes */
        // const candleSubscription = constructCandleSubscription(
        //     ['CS.D.BITCOIN.CFD.IP'],
        //     Scale['1MINUTE'],
        //     Object.values(CandleField),
        //     (epic: string, data: Candle) => {
        //         data.UTM = new Date(Number(data.UTM)).toLocaleString()
        //         console.log(epic, data)
        //     }
        // )
        // lsClient.subscribe(candleSubscription)

        /* Subscribe Trade related updates */
        // const tradeSubscription = constructTradeSubscription(
        //     session.accountId,
        //     ['CONFIRMS', 'OPU', 'WOU'],
        //     (tradeUpdates: { CONFIRMS: TradeConfirmation; OPU: OpenPositionUpdate; WOU: any }) => {
        //         console.log(tradeUpdates)
        //     }
        // )
        // lsClient.subscribe(tradeSubscription)
    } catch (err) {
        console.error(parseAxiosError(err))
    }

    /* Application Cleaning Up Before Shutdown */
    const cleaningUp = () => {
        try {
            // lsClient.unsubscribe(candleSubscription)
            // lsClient.disconnect()
        } catch (err) {
            console.warn(err)
        }
    }

    onAppShutodwn(
        (() => {
            let isCalled = false
            return () => {
                if (isCalled) {
                    return
                }
                cleaningUp()
                isCalled = true
            }
        })()
    )
}

main()
