import axios from 'axios'
import { API_BASE_URL } from './constant'

const authenticate = async (username: string, password: string, igApiKey: string) => {
    const { status, headers, data } = await axios({
        method: 'post',
        url: `${API_BASE_URL.DEMO}/session`,
        data: { identifier: username, password: password },
        headers: {
            'X-IG-API-KEY': igApiKey
        }
    })

    if (status === 200) {
        return {
            cst: headers['cst'],
            xSecurityToken: headers['x-security-token'],
            session: data
        }
    } else {
        console.error(`Cannot authenticate ${username} :(`)
        throw new Error(`Cannot authenticate ${username} :(`)
    }
}

export const searchEpics = async (query: string) => {
    const { cst, xSecurityToken, session } = await authenticate(
        process.env.IG_DEMO_USERNAME,
        process.env.IG_DEMO_PASSWORD,
        process.env.IG_DEMO_API_KEY
    )
    console.log('session:', session)

    const { data } = await axios({
        method: 'get',
        url: `${API_BASE_URL.DEMO}/markets?searchTerm=${query}`,
        headers: {
            'X-IG-API-KEY': process.env.IG_DEMO_API_KEY,
            CST: cst,
            'X-SECURITY-TOKEN': xSecurityToken
        }
    })

    console.log(data)
}

searchEpics('us30')
