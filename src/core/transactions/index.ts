import { URIS } from 'fp-ts/HKT'
import { Transaction } from '../../domain/transaction'
import { TransactionRepository } from '../repositories/transaction'
import { Trace } from '../trace'

type Persistence<F extends URIS> = TransactionRepository<F>

export const addTransaction =
    <F extends URIS>(C: Persistence<F> & Trace<F>) =>
    (transaction: Transaction) => {
        return C.add(transaction)
    }

export const getAllTransactions = <F extends URIS>(
    C: Persistence<F> & Trace<F>
) => {
    return C.all()
}
