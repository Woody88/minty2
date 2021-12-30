import { Do } from 'fp-ts-contrib/lib/Do'
import { URIS } from 'fp-ts/HKT'
import { Monad1 } from 'fp-ts/Monad'
import { AccountId } from '../../domain/account'
import { Transaction } from '../../domain/transaction'
import { TransactionRepository } from '../repositories/transaction'
import { Trace } from '../trace'

type Persistence<F extends URIS> = TransactionRepository<F>

export const addTransaction =
  <F extends URIS>(C: Persistence<F> & Trace<F> & Monad1<F>) =>
  (transaction: Transaction) =>
    Do(C)
      .do(C.trace(`User ${transaction.accountId} adding new transaction`))
      .bind('result', C.add(transaction))
      .return(({ result }) => result)

export const getAllTransactions =
  <F extends URIS>(C: Persistence<F> & Trace<F> & Monad1<F>) =>
  (accountId: AccountId) =>
    Do(C)
      .do(C.trace(`Retrieving user ${accountId} recent transactions`))
      .bind('transactions', C.all(accountId))
      .return(({ transactions }) => transactions)
