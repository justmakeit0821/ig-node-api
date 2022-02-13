import IG from './IG'

const main = async () => {
    const myIg = new IG(process.env.IG_DEMO_USERNAME, process.env.IG_DEMO_PASSWORD, process.env.IG_DEMO_API_KEY)
    const session = await myIg.authenticate()
    console.log('session:', session)
    const markets = await myIg.searchEpics('us30')
    console.log(markets[0])
    const securityTokens = await myIg.fetchSecurityTokens()
    console.log(securityTokens)
}
main()
