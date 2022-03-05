import axios from 'axios'
import { Market } from '../../types'
import { handleAxiosError } from '../axios-error-handler'

export const searchEpics = async (apiBaseUrl: string, query: string, igApiKey: string, accountId: string, accessToken: string) => {
    try {
        const { data }: { data: { markets: Market[] } } = await axios({
            method: 'get',
            url: `${apiBaseUrl}/markets?searchTerm=${query}`,
            headers: {
                'X-IG-API-KEY': igApiKey,
                'IG-ACCOUNT-ID': accountId,
                Authorization: `Bearer ${accessToken}`
            }
        })
        return data.markets
    } catch (err: any) {
        return handleAxiosError(err)
    }
}
