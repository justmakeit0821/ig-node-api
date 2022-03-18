import axios from 'axios'

export const getPrices = async (
    apiBaseUrl: string,
    igApiKey: string,
    accountId: string,
    accessToken: string,
    epic: string,
    resolution: PriceResolution = 'MINUTE',
    /** Limits the number of price points (not applicable if a date range has been specified) (Default = 10) */
    max: number = 10,
    /** Page size (disable paging = 0) (Default = 20) */
    pageSize: number = 20,
    /** Page number (Default = 1) */
    pageNumber: number = 1,
    /** DateTime Format: yyyy-MM-dd'T'HH:mm:ss */
    from?: string,
    /** DateTime Format: yyyy-MM-dd'T'HH:mm:ss */
    to?: string
) => {
    const searchParams = new URLSearchParams({
        resolution: resolution.toString(),
        max: max.toString(),
        pageSize: pageSize.toString(),
        pageNumber: pageNumber.toString()
    })
    if (from) {
        searchParams.append('from', from)
    }
    if (to) {
        searchParams.append('to', to)
    }

    const { data }: { data: PriceResponse } = await axios({
        method: 'get',
        url: `${apiBaseUrl}/prices/${epic}?${searchParams.toString()}`,
        headers: {
            'X-IG-API-KEY': igApiKey,
            'IG-ACCOUNT-ID': accountId,
            Authorization: `Bearer ${accessToken}`,
            Version: 3
        }
    })
    return data
}
