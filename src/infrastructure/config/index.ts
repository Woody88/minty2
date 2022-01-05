import { Do } from 'fp-ts-contrib/lib/Do'
import { task, either } from 'fp-ts'
import { Task } from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import * as D from 'io-ts/Decoder'

const portDecoder: D.Decoder<string, number> = {
  decode: (s) =>
    pipe(Number.parseInt(s, 10), (n) =>
      Number.isNaN(n) || !(n >= 3000 && n <= 9000)
        ? D.failure(n, "a valid port number between '3000' and '9000'")
        : D.success(n)
    ),
}

const Port = D.compose(portDecoder)(D.string)

export const Config = D.struct({
  PORT: Port,
})

export type Config = D.TypeOf<typeof Config>

export const loadConfig: Task<Config> = Do(task.Monad)
  .bind('eConfig', task.of(Config.decode(process.env)))
  .bindL(
    'config',
    ({ eConfig }) =>
      () =>
        pipe(
          eConfig,
          either.match(
            (e) => Promise.reject(D.draw(e)),
            (config) => Promise.resolve(config)
          )
        )
  )
  .return(({ config }) => config)
