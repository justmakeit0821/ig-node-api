import axios from 'axios'
import { SecurityTokens } from '../../@types'

export const fetchSecurityTokens = async (apiBaseUrl: string, igApiKey: string, accountId: string, accessToken: string): Promise<SecurityTokens> => {
    const { headers } = await axios({
        method: 'get',
        url: `${apiBaseUrl}/session?fetchSessionTokens=true`,
        headers: {
            'X-IG-API-KEY': igApiKey,
            'IG-ACCOUNT-ID': accountId,
            Authorization: `Bearer ${accessToken}`
        }
    })

    return {
        cst: headers['cst'],
        xst: headers['x-security-token']
    }
}
