import { URIS } from 'fp-ts/HKT'
import { MonadTask1 } from 'fp-ts/MonadTask'
import { TransactionRepository } from '../../core/repositories/transaction'
import { UserRepository } from '../../core/repositories/user'
import { Trace } from '../../core/trace'

/** This module expose the type `App` which contains all dependencies needed for the application to run **/
export type App<F extends URIS> = MonadTask1<F> & Trace<F> & Persistence<F>

type Persistence<F extends URIS> = {
  persistence: {
    transaction: TransactionRepository<F>
    user: UserRepository<F>
  }
}
