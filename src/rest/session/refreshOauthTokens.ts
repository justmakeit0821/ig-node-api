import axios from 'axios'
import { OauthToken } from '../../@types'

export const refreshOauthTokens = async (apiBaseUrl: string, refreshToken: string, igApiKey: string) => {
    const { data }: { data: OauthToken } = await axios({
        method: 'post',
        url: `${apiBaseUrl}/session/refresh-token`,
        data: { refresh_token: refreshToken },
        headers: {
            'X-IG-API-KEY': igApiKey
        }
    })

    return data
}
