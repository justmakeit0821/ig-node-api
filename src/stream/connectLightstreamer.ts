import { LightstreamerClient } from 'lightstreamer-client-node'

export const connectLightstreamer = (lsEndPoint: string, accountId: string, cst: string, xst: string) => {
    const lsClient = new LightstreamerClient(lsEndPoint)
    lsClient.connectionDetails.setUser(accountId)
    lsClient.connectionDetails.setPassword(`CST-${cst}|XST-${xst}`)

    /*
        Note: the Lightstreamer library will transparently attempt to reconnect a number of times in the event of communicationss errors
    */
    lsClient.addListener({
        onListenStart: function (lsClient: LightstreamerClient) {
            console.info('[ig-node-api] On Listen Start.')
        },
        onStatusChange: function (status: string) {
            console.info('[ig-node-api] On Status Change:', status)
        },
        onServerError: function (errCode: number, errMsg: string) {
            console.error('[ig-node-api] On Server Error:', errCode, errMsg)
        },
        onListenEnd: function (lsClient: LightstreamerClient) {
            console.info('[ig-node-api] On Listen End.')
        },
        onPropertyChange: function (property: string) {
            // console.info('On Property Change:', property)
        }
    })

    lsClient.connect()
    return lsClient
}
