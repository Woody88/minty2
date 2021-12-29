import { date, either, option, task } from 'fp-ts'
import { TransactionRepository } from '../../../core/repositories/transaction'
import { v4 as uuidv4 } from 'uuid'
import { Do } from 'fp-ts-contrib/lib/Do'
import { Transaction } from '../../../domain/transaction'
import { pipe } from 'fp-ts/function'

export const transactionRepoIntepreter =
    (): TransactionRepository<task.URI> => {
        // const dbFake: Recode<number, Transaction[]> = {}

        return {
            ...task.Monad,
            add: (trn) => task.of(void 0),
            lookup: (trnId_) => task.of(option.none),
            all: (accountId) => {
                return Do(task.Monad)
                    .bind('trnDate', task.fromIO(date.create))
                    .bindL('transactions', ({ trnDate }) => {
                        const trn = {
                            accountId: `${accountId}`,
                            merchant: 'random',
                            transaction_type: 'EXPENSE',
                            payment_type: 'CASH',
                            amount: 10.0,
                            category: 'randm',
                            date: trnDate.toUTCString(),
                            notes: '',
                        }

                        return pipe(
                            Transaction.decode(trn),
                            either.fold(
                                (e) => {
                                    throw new Error(
                                        'Transaction decoding error'
                                    )
                                },
                                (trx) => task.of([trx])
                            )
                        )
                    })
                    .return(({ transactions }) => transactions)
            },
        }
    }
