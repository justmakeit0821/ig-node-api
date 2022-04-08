import { ItemUpdate, Subscription } from 'lightstreamer-client-node'
import { TradeSubscriptionField, TradeConfirmation, OpenPositionUpdate } from '../@types'

export const constructTradeSubscription = (
    accountId: string,
    fields: TradeSubscriptionField[],
    handler: (tradeUpdates: { CONFIRMS: TradeConfirmation; OPU: OpenPositionUpdate; WOU: any }) => void
    // TODO: expose onSubscription, onUnsubscription, onSubscriptionError handler to the consumer
) => {
    const subscription = new Subscription('DISTINCT', `TRADE:${accountId}`, fields)
    subscription.addListener({
        onSubscription: function () {
            console.info(`[ig-node-api] Subscribed Trade Updates of ${fields.join(', ')} for Account ${accountId}.`)
        },
        onUnsubscription: function () {
            console.info(`[ig-node-api] Unsubscribed Trade Updates of ${fields.join(', ')} for Account ${accountId}.`)
        },
        onSubscriptionError: function (errCode: number, errMsg: string) {
            console.error('[ig-node-api] On Trade Subscription Error:', errCode, errMsg)
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
