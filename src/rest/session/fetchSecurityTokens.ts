import axios from 'axios'
import { SecurityTokens } from '../../@types'

export const fetchSecurityTokens = async (apiBaseUrl: string, igApiKey: string, accountId: string, accessToken: string): Promise<SecurityTokens> => {
    try {
        const { status, statusText, headers } = await axios({
            method: 'get',
            url: `${apiBaseUrl}/session?fetchSessionTokens=true`,
            headers: {
                'X-IG-API-KEY': igApiKey,
                'IG-ACCOUNT-ID': accountId,
                Authorization: `Bearer ${accessToken}`
            }
        })

        if (status === 200) {
            return {
                cst: headers['cst'],
                xst: headers['x-security-token']
            }
        } else {
            const errMsg = `Cannot get security tokens for ${accountId} 😥, due to ${status} - ${statusText}.`
            console.error(errMsg)
            throw new Error(errMsg)
        }
    } catch (err) {
        const errMsg = `Cannot get security tokens for ${accountId} 😥, due to ${err}`
        console.error(errMsg)
        throw new Error(errMsg)
    }
}
