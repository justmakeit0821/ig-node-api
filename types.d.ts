export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            IG_LIVE_API_KEY: string
            IG_LIVE_USERNAME: string
            IG_LIVE_PASSWORD: string
            IG_DEMO_API_KEY: string
            IG_DEMO_USERNAME: string
            IG_DEMO_PASSWORD: string
        }
    }
}
