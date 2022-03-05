import { AxiosError } from 'axios'

export const handleAxiosError = (err: AxiosError) => {
    if (err.response) {
        // Request made and server responded
        const { status, statusText, data } = err.response
        return { failed: true, situation: 'Request made and server responded.', status, statusText, data }
    } else if (err.request) {
        // The request was made but no response was received
        console.warn(err.request)
        return { failed: true, situation: 'The request was made but no response was received.', request: err.request }
    } else {
        // Something happened in setting up the request that triggered an Error
        console.warn('Error', err.message)
        return { failed: true, situation: 'Something happened in setting up the request that triggered an Error.', message: err.message }
    }
}
