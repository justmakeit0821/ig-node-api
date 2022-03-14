import axios from 'axios'
import { Watchlist, Market, CreateWatchlistRequest, CreateWatchlistResponse } from '../../types'

export const getWatchlists = async (apiBaseUrl: string, igApiKey: string, accountId: string, accessToken: string) => {
    const { data }: { data: { watchlists: Watchlist[] } } = await axios({
        method: 'get',
        url: `${apiBaseUrl}/watchlists`,
        headers: {
            'X-IG-API-KEY': igApiKey,
            'IG-ACCOUNT-ID': accountId,
            Authorization: `Bearer ${accessToken}`
        }
    })
    return data.watchlists
}

export const getWatchlistDetail = async (watchlistId: string, apiBaseUrl: string, igApiKey: string, accountId: string, accessToken: string) => {
    const { data }: { data: { markets: Market[] } } = await axios({
        method: 'get',
        url: `${apiBaseUrl}/watchlists/${watchlistId}`,
        headers: {
            'X-IG-API-KEY': igApiKey,
            'IG-ACCOUNT-ID': accountId,
            Authorization: `Bearer ${accessToken}`
        }
    })
    return data.markets
}

export const createWatchlist = async (
    createWatchlistRequest: CreateWatchlistRequest,
    apiBaseUrl: string,
    igApiKey: string,
    accountId: string,
    accessToken: string
) => {
    const { data }: { data: CreateWatchlistResponse } = await axios({
        method: 'post',
        url: `${apiBaseUrl}/watchlists`,
        headers: {
            'X-IG-API-KEY': igApiKey,
            'IG-ACCOUNT-ID': accountId,
            Authorization: `Bearer ${accessToken}`
        },
        data: createWatchlistRequest
    })
    return data
}

export const deleteWatchlist = async (watchlistId: string, apiBaseUrl: string, igApiKey: string, accountId: string, accessToken: string) => {
    const { data }: { data: { status: string } } = await axios({
        method: 'delete',
        url: `${apiBaseUrl}/watchlists/${watchlistId}`,
        headers: {
            'X-IG-API-KEY': igApiKey,
            'IG-ACCOUNT-ID': accountId,
            Authorization: `Bearer ${accessToken}`
        }
    })
    return data
}
