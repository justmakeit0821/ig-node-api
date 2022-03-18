import axios from 'axios'

export const getAccountDetails = async (apiBaseUrl: string, igApiKey: string, accountId: string, accessToken: string) => {
    const { data }: { data: { accounts: Account[] } } = await axios({
        method: 'get',
        url: `${apiBaseUrl}/accounts`,
        headers: {
            'X-IG-API-KEY': igApiKey,
            'IG-ACCOUNT-ID': accountId,
            Authorization: `Bearer ${accessToken}`,
            Version: 1
        }
    })
    return data
}
