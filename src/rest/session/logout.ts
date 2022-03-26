import axios from 'axios'

export const logout = async (apiBaseUrl: string, igApiKey: string, accountId: string, accessToken: string) => {
    await axios({
        method: 'post',
        url: `${apiBaseUrl}/session`,
        headers: {
            'X-IG-API-KEY': igApiKey,
            'IG-ACCOUNT-ID': accountId,
            Authorization: `Bearer ${accessToken}`,
            Version: 1,
            _method: 'DELETE'
        }
    })
}
