export const onAppShutodwn = (handler: Function) => {
    process.stdin.resume() // begin reading from stdin so the process does not exit instantly
    process.once('uncaughtException', (err, origin) => {
        console.warn(`Application is going to shutdown due to "uncaughtException"...`)
        console.error(err.stack)
        handler()
        setTimeout(() => {
            process.removeAllListeners()
            process.exit(0)
        }, 500)
    })
    process.once('unhandledRejection', (reason, promise) => {
        console.warn(`Application is going to shutdown due to "unhandledRejection"...`)
        console.error(reason)
        console.error(promise)
        handler()
        setTimeout(() => {
            process.removeAllListeners()
            process.exit(0)
        }, 500)
    })
    process.once('exit', (exitCode) => {
        console.warn(`Application is going to shutdown due to "exit(${exitCode})"...`)
        handler()
        setTimeout(() => {
            process.removeAllListeners()
            process.exit(0)
        }, 500)
    })
    ;['SIGINT', 'SIGTERM', 'SIGUSR1', 'SIGUSR2', 'SIGHUP'].forEach((sig) => {
        process.once(sig, (sig) => {
            console.warn(`Application is going to shutdown due to "${sig}"...`)
            handler()
            setTimeout(() => {
                process.removeAllListeners()
                process.exit(0)
            }, 500)
        })
    })
}
