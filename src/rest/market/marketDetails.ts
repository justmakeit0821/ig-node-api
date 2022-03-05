import axios from 'axios'
import { MarketDetail } from '../../types'
import { MarketDetailsFilterType } from '../../constant'
import { handleAxiosError } from '../axios-error-handler'

export const getMarketsDetails = async (
    epics: string[],
    filter: MarketDetailsFilterType = MarketDetailsFilterType.ALL,
    apiBaseUrl: string,
    igApiKey: string,
    accountId: string,
    accessToken: string
) => {
    try {
        const { data }: { data: { marketDetails: MarketDetail[] } } = await axios({
            method: 'get',
            url: `${apiBaseUrl}/markets?epics=${epics.join(',')}&filter=${filter}`,
            headers: {
                'X-IG-API-KEY': igApiKey,
                'IG-ACCOUNT-ID': accountId,
                Authorization: `Bearer ${accessToken}`
            }
        })
        return data.marketDetails
    } catch (err: any) {
        return handleAxiosError(err)
    }
}

export const getMarketDetails = async (epic: string, apiBaseUrl: string, igApiKey: string, accountId: string, accessToken: string) => {
    try {
        const { data }: { data: MarketDetail } = await axios({
            method: 'get',
            url: `${apiBaseUrl}/markets/${epic}`,
            headers: {
                'X-IG-API-KEY': igApiKey,
                'IG-ACCOUNT-ID': accountId,
                Authorization: `Bearer ${accessToken}`
            }
        })
        return data
    } catch (err: any) {
        return handleAxiosError(err)
    }
}
