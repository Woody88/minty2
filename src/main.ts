import { task } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import { Task } from 'fp-ts/Task'
import { application } from './infrastructure/application-dependency'
import { createServer } from './infrastructure/web/server'

const main: Task<void> = pipe(
    task.Do,
    // task.bind('config', () => loadConfig),
    task.bind('server', () => createServer(application)),
    task.chain(({ server }) => {
        server.listen(8000, (err, address) => {
            console.log(`listening at ${address}`)
        })
        return task.of(void 0)
    })
)

main()
