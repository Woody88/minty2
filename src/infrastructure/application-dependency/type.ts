import { URIS } from 'fp-ts/HKT'
import { MonadTask1 } from 'fp-ts/MonadTask'
import { TransactionRepository } from '../../core/repositories/transaction'
import { Trace } from '../../core/trace'

/** This module expose the type `App` which contains all dependencies needed for the application to run **/
export type App<F extends URIS> = MonadTask1<F> & Trace<F> & Repositories<F>

type Repositories<F extends URIS> = TransactionRepository<F>
