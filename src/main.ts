import { task } from 'fp-ts'
import { constVoid, pipe } from 'fp-ts/function'
import { Task } from 'fp-ts/Task'
import { createApp } from './infrastructure/application_assembly'

// const main: Task<void> = () => Promise.resolve(console.log('Hello, World!'))

// main()

interface Config {
    port: number
}

declare const loadConfig: Task<Config>

const main: Task<void> = pipe(
    task.Do,
    task.bind('config', () => loadConfig),
    task.bind('server', () => task.of(createApp())),
    task.chain(({ server, config }) => {
        server.listen(config.port, (err, address) => {
            console.log(`listening at ${address}`)
        })
        return task.of(constVoid())
    })
)

main()
