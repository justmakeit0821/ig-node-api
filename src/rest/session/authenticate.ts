import axios from 'axios'
import { Session } from '../../types'

export const authenticate = async (apiBaseUrl: string, username: string, password: string, igApiKey: string) => {
    try {
        const { status, statusText, data }: { status: number; statusText: string; data: Session } = await axios({
            method: 'post',
            url: `${apiBaseUrl}/session`,
            data: { identifier: username, password: password },
            headers: {
                Version: 3,
                'X-IG-API-KEY': igApiKey
            }
        })

        if (status === 200) {
            console.info(`Authenticated ${username} 😄.`)
            return data
        } else {
            const errMsg = `Cannot authenticate ${username} 😥, due to ${status} - ${statusText}.`
            console.error(errMsg)
            throw new Error(errMsg)
        }
    } catch (err) {
        const errMsg = `Cannot authenticate ${username} 😥, due to ${err}`
        console.error(errMsg)
        throw new Error(errMsg)
    }
}
