import got from 'got'
import { API_BASE_URL } from './constant'

const login = async (username: string, password: string, igApiKey: string) => {
    const res = await got
        .post(`${API_BASE_URL.DEMO}/session`, {
            json: { identifier: username, password: password },
            headers: {
                'X-IG-API-KEY': igApiKey
            }
        })
        .json()

    console.log(res)
}
login(process.env.IG_DEMO_USERNAME!, process.env.IG_DEMO_PASSWORD!, process.env.IG_DEMO_API_KEY!)
