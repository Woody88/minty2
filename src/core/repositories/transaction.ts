import { Kind, URIS } from 'fp-ts/HKT'
import { Option } from 'fp-ts/Option'
import { AccountId } from '../../domain/account'
import { Transaction, TransactionId } from '../../domain/transaction'

export interface TransactionRepository<F extends URIS> {
    add: (transaction: Transaction) => Kind<F, void>

    lookup: (transactionId: TransactionId) => Kind<F, Option<Transaction>>

    all: (accountId: AccountId) => Kind<F, Transaction[]>
}
