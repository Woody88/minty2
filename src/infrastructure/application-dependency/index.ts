import { task } from 'fp-ts'
import { transactionRepoIntepreter } from '../persistence/inmemory/transaction_repository'
import { traceInterpreter } from '../trace'
import { App } from './type'

export const application: App<task.URI> = {
    ...task.MonadTask,
    ...transactionRepoIntepreter(),
    ...traceInterpreter(),
}
