import axios from 'axios'
import { Session } from '../../@types'

export const fetchOauthTokens = async (apiBaseUrl: string, username: string, password: string, igApiKey: string) => {
    const { data }: { data: Session } = await axios({
        method: 'post',
        url: `${apiBaseUrl}/session`,
        data: { identifier: username, password: password },
        headers: {
            Version: 3,
            'X-IG-API-KEY': igApiKey
        }
    })

    return data
}
