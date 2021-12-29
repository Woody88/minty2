import { Kind, URIS } from 'fp-ts/HKT'
import { Either } from 'fp-ts/Either'
import { AccountId } from '../../domain/account'
import { Transaction, TransactionId } from '../../domain/transaction'

export type TransactionException = string

export interface TransactionRepository<F extends URIS> {
  readonly add: (
    transaction: Transaction
  ) => Kind<F, Either<TransactionException, void>>

  readonly lookup: (
    transactionId: TransactionId
  ) => Kind<F, Either<TransactionException, Transaction>>

  readonly all: (
    accountId: AccountId
  ) => Kind<F, Either<TransactionException, Transaction[]>>
}
