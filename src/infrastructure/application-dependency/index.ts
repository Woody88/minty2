import { task } from 'fp-ts'
import { transactionRepoIntepreter } from '../persistence/inmemory/transaction_repository'
import { userRepoIntepreter } from '../persistence/inmemory/user_repository'
import { traceInterpreter } from '../trace'
import { App } from './type'

export const application: App<task.URI> = {
  ...task.MonadTask,
  ...traceInterpreter(),
  persistence: {
    transaction: transactionRepoIntepreter(),
    user: userRepoIntepreter(),
  },
}
