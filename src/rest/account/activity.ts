import axios from 'axios'
import { TransactionType, TransactionHistoryResponse } from '../../types'

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
