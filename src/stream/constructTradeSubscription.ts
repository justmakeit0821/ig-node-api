import { ItemUpdate, Subscription } from 'lightstreamer-client-node'

export const constructTradeSubscription = (
    accountId: string,
    fields: TradeSubscriptionField[],
    handler: (tradeUpdates: { CONFIRMS: TradeConfirmation; OPU: OpenPositionUpdate; WOU: any }) => void
) => {
    const subscription = new Subscription('DISTINCT', `TRADE:${accountId}`, fields)
    subscription.addListener({
        onSubscription: function () {
            console.info(`Subscribed ${fields.join(', ')} for Account ${accountId}.`)
        },
        onUnsubscription: function () {
            console.info(`Unsubscribed ${fields.join(', ')} for Account ${accountId}.`)
        },
        onSubscriptionError: function (errCode: number, errMsg: string) {
            console.error('On Trade Subscription Error:', errCode, errMsg)
        },
        onItemUpdate: function (item: ItemUpdate) {
            const tradeUpdates = fields.reduce((acc: any, field) => {
                acc[field] = JSON.parse(item.getValue(field))
                return acc
            }, {})
            tradeUpdates['isSnapshot'] = item.isSnapshot()

            handler(tradeUpdates)
        }
    })
    return subscription
}
