import { task } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import { Task } from 'fp-ts/Task'
import { application } from './infrastructure/application-dependency'
import { Config, loadConfig } from './infrastructure/config'
import { createServer } from './infrastructure/web/server'

const runServer = (config: Config): Task<void> =>
  pipe(
    task.Do,
    task.bind('server', () => createServer(application)),
    task.chain(({ server }) => {
      server.listen(config.PORT, (err, address) => {
        console.log(`listening at ${address}`)
      })
      return task.of(void 0)
    })
  )

const main: Task<void> = pipe(
  task.Do,
  task.bind('config', () => loadConfig),
  task.chain(({ config }) => runServer(config))
)

main()
