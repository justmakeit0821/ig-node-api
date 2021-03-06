import axios from 'axios'
import {
    CreatePositionRequest,
    CreatePositionResponse,
    ClosePositionRequest,
    ClosePositionResponse,
    CheckDealStatusResponse,
    Position,
    Market
} from '../../@types'

export const createOtcPosition = async (
    createPositionRequest: CreatePositionRequest,
    apiBaseUrl: string,
    igApiKey: string,
    accountId: string,
    accessToken: string
) => {
    const { data }: { data: CreatePositionResponse } = await axios({
        method: 'post',
        url: `${apiBaseUrl}/positions/otc`,
        headers: {
            'X-IG-API-KEY': igApiKey,
            'IG-ACCOUNT-ID': accountId,
            Authorization: `Bearer ${accessToken}`
        },
        data: createPositionRequest
    })
    return data
}

export const closeOtcPosition = async (
    closePositionRequest: ClosePositionRequest,
    apiBaseUrl: string,
    igApiKey: string,
    accountId: string,
    accessToken: string
) => {
    const { data }: { data: ClosePositionResponse } = await axios({
        method: 'post',
        url: `${apiBaseUrl}/positions/otc`,
        headers: {
            'X-IG-API-KEY': igApiKey,
            'IG-ACCOUNT-ID': accountId,
            Authorization: `Bearer ${accessToken}`,
            Version: 1,
            _method: 'DELETE'
        },
        data: closePositionRequest
    })
    return data
}

export const checkDealStatus = async (dealReference: string, apiBaseUrl: string, igApiKey: string, accountId: string, accessToken: string) => {
    const { data }: { data: CheckDealStatusResponse } = await axios({
        method: 'get',
        url: `${apiBaseUrl}/confirms/${dealReference}`,
        headers: {
            'X-IG-API-KEY': igApiKey,
            'IG-ACCOUNT-ID': accountId,
            Authorization: `Bearer ${accessToken}`
        }
    })
    return data
}

export const getOpenPositions = async (apiBaseUrl: string, igApiKey: string, accountId: string, accessToken: string) => {
    const { data }: { data: { positions: Array<{ position: Position; market: Market }> } } = await axios({
        method: 'get',
        url: `${apiBaseUrl}/positions`,
        headers: {
            'X-IG-API-KEY': igApiKey,
            'IG-ACCOUNT-ID': accountId,
            Authorization: `Bearer ${accessToken}`,
            Version: 2
        }
    })
    return data
}

export const getOpenPosition = async (dealId: string, apiBaseUrl: string, igApiKey: string, accountId: string, accessToken: string) => {
    const { data }: { data: { position: Position; market: Market } } = await axios({
        method: 'get',
        url: `${apiBaseUrl}/positions/${dealId}`,
        headers: {
            'X-IG-API-KEY': igApiKey,
            'IG-ACCOUNT-ID': accountId,
            Authorization: `Bearer ${accessToken}`,
            Version: 2
        }
    })
    return data
}
