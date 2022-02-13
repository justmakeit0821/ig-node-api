import IG from './IG'
import { constructCandleSubscription } from './stream/constructCandleSubscription'
import { CandleField, Scale } from './constant'
import { onAppShutodwn } from './exception-handler'
import { Candle } from './types'

const main = async () => {
    const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY)
    const session = await myIg.authenticate()
    console.log('session:', session)
    const markets = await myIg.searchEpics('us30')
    console.log(markets[0])

    const lsClient = myIg.connectLightStreamer()
    const candleSubscription = constructCandleSubscription(
        ['CS.D.BITCOIN.CFD.IP'],
        Scale.MINUTE,
        Object.values(CandleField),
        (epic: string, data: Candle) => {
            data.UTM = new Date(Number(data.UTM)).toLocaleString()
            console.log(epic, data)
        }
    )
    lsClient.subscribe(candleSubscription)

    /* Application Cleaning Up Before Shutdown */
    const cleaningUp = () => {
        try {
            lsClient.unsubscribe(candleSubscription)
            lsClient.disconnect()
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
