import { date, either, task, taskEither, string } from 'fp-ts'
import {
  TransactionException,
  TransactionRepository,
} from '../../../core/repositories/transaction'
import { Do } from 'fp-ts-contrib/lib/Do'
import { Transaction } from '../../../domain/transaction'
import { pipe, constVoid } from 'fp-ts/function'
import * as map from 'fp-ts/Map'
import { Either } from 'fp-ts/Either'

export const transactionRepoIntepreter =
  (): TransactionRepository<task.URI> => {
    const dbFake: Map<string, Transaction[]> = new Map([
      ['3fa85f64-5717-4562-b3fc-2c963f66afa6', []],
    ])

    const lookUpById = (accountId: string): Either<string, Transaction[]> =>
      pipe(
        map.lookup(string.Eq)(accountId)(dbFake),
        either.fromOption(() => 'Invalid Id')
      )

    return {
      ...task.Monad,
      add: (trn) =>
        Do(taskEither.Monad)
          .bind(
            'transactions',
            taskEither.fromEither(lookUpById(trn.accountId))
          )
          .return(({ transactions }) =>
            pipe(dbFake.set(trn.accountId, [trn, ...transactions]), () =>
              constVoid()
            )
          ),
      lookup: (trnId_) => taskEither.throwError('Not Implemented'),
      all: (accountId) =>
        Do(taskEither.Monad)
          .bind(
            'trnDate',
            taskEither.fromIO<Date, TransactionException>(date.create)
          )
          .bind('transactions', taskEither.fromEither(lookUpById(accountId)))
          .return(({ transactions }) => transactions),
    }
  }
