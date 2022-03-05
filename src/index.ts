import IG from './IG'
import { constructCandleSubscription } from './stream/constructCandleSubscription'
import { CandleField, Scale } from './constant'
import { onAppShutodwn } from './exception-handler'
import { Candle } from './types'

const main = async () => {
    try {
        const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY)
        const session = await myIg.authenticate()
        console.log('session:', session)
        // const markets = await myIg.searchEpics('us30')
        // console.log(markets[0])

        // const marketCategories = await myIg.getMarketCategories()
        // console.log(marketCategories)

        // const marketSubCategories = await myIg.getMarketSubCategories('97606')
        // console.log(marketSubCategories)

        // const marketDetails = await myIg.getMarketsDetails(['IX.D.DOW.IFD.IP', 'IX.D.SPTRD.IFA.IP'])
        // console.dir(marketDetails)

        // const marketDetail = await myIg.getMarketDetails('IX.D.DOW.IFD.IP')
        // console.dir(marketDetail)

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

        const watchlistCreateResult = await myIg.createWatchlist({
            name: `My Dear Babe's Watchlist`,
            epics: ['IX.D.DOW.IFD.IP', 'IX.D.SPTRD.IFA.IP']
        })
        console.log(watchlistCreateResult)

        const watchlists = await myIg.getWatchlists()
        console.log(watchlists)

        // const watchlistDeatil = await myIg.getWatchlistDetail('16906317')
        // console.log(watchlistDeatil)

        const watchlistDeleteResult = await myIg.deleteWatchlist('16906317')
        console.log(watchlistDeleteResult)

        // const lsClient = myIg.connectLightStreamer()
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
    } catch (err) {
        // console.error(err)
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
