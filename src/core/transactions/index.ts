import { Do } from 'fp-ts-contrib/lib/Do'
import { URIS } from 'fp-ts/HKT'
import { Monad1 } from 'fp-ts/Monad'
import { AccountId } from '../../domain/account'
import { Transaction } from '../../domain/transaction'
import { TransactionRepository } from '../repositories/transaction'
import { Trace } from '../trace'

export type TransactionService<F extends URIS> = Persistence<F> &
  Trace<F> &
  Monad1<F>

type Persistence<F extends URIS> = {
  persistence: {
    transaction: TransactionRepository<F>
  }
}

export const addTransaction =
  <F extends URIS>(S: TransactionService<F>) =>
  (transaction: Transaction) =>
    Do(S)
      .do(S.trace(`User ${transaction.accountId} adding new transaction`))
      .bind('result', S.persistence.transaction.add(transaction))
      .return(({ result }) => result)

export const getAllTransactions =
  <F extends URIS>(S: TransactionService<F>) =>
  (accountId: AccountId) =>
    Do(S)
      .do(S.trace(`Retrieving user ${accountId} recent transactions`))
      .bind('transactions', S.persistence.transaction.all(accountId))
      .return(({ transactions }) => transactions)
