import axios from 'axios'
import { ActivityHistoryResponse, TransactionType, TransactionHistoryResponse } from '../../@types'

export const getActivityHistory = async (
    apiBaseUrl: string,
    igApiKey: string,
    accountId: string,
    accessToken: string,
    /** Start date. DateTime Format: yyyy-MM-dd'T'HH:mm:ss */
    from: string,
    detailed: boolean = false,
    /** Page size (min = 10, max = 500, Default = 50) */
    pageSize: number = 50,
    /** Deal ID */
    dealId?: string,
    /** FIQL filter (supported operators: ==|!=|,|;) */
    filter?: string,
    /** End date. (Default = current time. A date without time component refers to the end of that day.) DateTime Format: yyyy-MM-dd'T'HH:mm:ss */
    to?: string
) => {
    const searchParams = new URLSearchParams({
        from,
        detailed: detailed.toString(),
        pageSize: pageSize.toString()
    })
    if (dealId) {
        searchParams.append('dealId', dealId)
    }
    if (filter) {
        searchParams.append('filter', filter)
    }
    if (to) {
        searchParams.append('to', to)
    }

    const { data }: { data: ActivityHistoryResponse } = await axios({
        method: 'get',
        url: `${apiBaseUrl}/history/activity?${searchParams.toString()}`,
        headers: {
            'X-IG-API-KEY': igApiKey,
            'IG-ACCOUNT-ID': accountId,
            Authorization: `Bearer ${accessToken}`,
            Version: 3
        }
    })
    return data
}

export const getTransactionHistory = async (
    apiBaseUrl: string,
    igApiKey: string,
    accountId: string,
    accessToken: string,
    type: TransactionType = 'ALL',
    /** Limits the timespan in seconds through to current time (not applicable if a date range has been specified) */
    maxSpanSeconds: number = 600,
    /** Page size (disable paging = 0) (Default = 20) */
    pageSize: number = 20,
    /** Page number (Default = 1) */
    pageNumber: number = 1,
    /** DateTime Format: yyyy-MM-dd'T'HH:mm:ss */
    from?: string,
    /** DateTime Format: yyyy-MM-dd'T'HH:mm:ss */
    to?: string
) => {
    const searchParams = new URLSearchParams({
        type,
        maxSpanSeconds: maxSpanSeconds.toString(),
        pageSize: pageSize.toString(),
        pageNumber: pageNumber.toString()
    })
    if (from) {
        searchParams.append('from', from)
    }
    if (to) {
        searchParams.append('to', to)
    }

    const { data }: { data: TransactionHistoryResponse } = await axios({
        method: 'get',
        url: `${apiBaseUrl}/history/transactions?${searchParams.toString()}`,
        headers: {
            'X-IG-API-KEY': igApiKey,
            'IG-ACCOUNT-ID': accountId,
            Authorization: `Bearer ${accessToken}`,
            Version: 2
        }
    })
    return data
}
