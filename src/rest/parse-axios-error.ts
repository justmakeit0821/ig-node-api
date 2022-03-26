import { AxiosError } from 'axios'

export const parseAxiosError = (err: AxiosError) => {
    if (err.response) {
        // Request made and server responded
        const { status, statusText, data } = err.response
        return {
            failed: true,
            request: {
                method: err.config.method,
                url: err.config.url,
                headers: err.config.headers,
                data: err.config.data
            },
            situation: 'Request made and server responded.',
            status,
            statusText,
            data
        }
    } else if (err.request) {
        // The request was made but no response was received
        return {
            failed: true,
            situation: 'The request was made but no response was received.',
            request: {
                method: err.config.method,
                url: err.config.url,
                headers: err.config.headers,
                data: err.config.data
            }
        }
    } else {
        // Something happened in setting up the request that triggered an Error
        return {
            failed: true,
            situation: 'Something happened in setting up the request that triggered an Error.',
            message: err.message,
            request: {
                method: err.config.method,
                url: err.config.url,
                headers: err.config.headers,
                data: err.config.data
            }
        }
    }
}
