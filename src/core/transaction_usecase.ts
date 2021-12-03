import { URIS } from 'fp-ts/HKT'
import { Transaction } from '../domain/transaction'
import { TransactionRepository } from './repositories/transaction'

export const addTransaction =
    <F extends URIS>(TRNS: TransactionRepository<F>) =>
    (transaction: Transaction) => {
        return TRNS.add(transaction)
    }

export const getAllTransactions = <F extends URIS>(
    TRNS: TransactionRepository<F>
) => {
    return TRNS.all()
}
