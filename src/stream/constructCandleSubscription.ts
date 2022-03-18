import { ItemUpdate, Subscription } from 'lightstreamer-client-node'

export const constructCandleSubscription = (epics: string[], scale: string, fields: string[], handler: (epic: string, candle: Candle) => void) => {
    const subscription = new Subscription(
        'MERGE',
        epics.map((epic) => `CHART:${epic}:${scale}`),
        fields
    )
    subscription.addListener({
        onSubscription: function () {
            console.info('Subscribed Candle changes for', epics)
        },
        onUnsubscription: function () {
            console.info('Unsubscribed Candle changes for', epics)
        },
        onSubscriptionError: function (errCode: number, errMsg: string) {
            console.error('On Candle Subscription Error:', errCode, errMsg)
        },
        onItemUpdate: function (item: ItemUpdate) {
            const epic = item.getItemName().split(':')[1]
            const candle = fields.reduce((acc: any, field) => {
                acc[field] = item.getValue(field)
                return acc
            }, {})

            handler(epic, candle)
        }
    })
    return subscription
}
