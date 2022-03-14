import axios from 'axios'
import { MarketCategory } from '../../types'

export const getMarketCategories = async (apiBaseUrl: string, igApiKey: string, accountId: string, accessToken: string) => {
    const { data }: { data: { markets: any; nodes: MarketCategory[] } } = await axios({
        method: 'get',
        url: `${apiBaseUrl}/marketnavigation`,
        headers: {
            'X-IG-API-KEY': igApiKey,
            'IG-ACCOUNT-ID': accountId,
            Authorization: `Bearer ${accessToken}`
        }
    })
    return data.nodes
}

export const getMarketSubCategories = async (nodeId: string, apiBaseUrl: string, igApiKey: string, accountId: string, accessToken: string) => {
    const { data }: { data: { markets: any; nodes: MarketCategory[] } } = await axios({
        method: 'get',
        url: `${apiBaseUrl}/marketnavigation/${nodeId}`,
        headers: {
            'X-IG-API-KEY': igApiKey,
            'IG-ACCOUNT-ID': accountId,
            Authorization: `Bearer ${accessToken}`
        }
    })
    return data.nodes
}
