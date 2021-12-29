import { FastifyReply, FastifyRequest } from 'fastify'
import { URIS } from 'fp-ts/HKT'
import { Transaction } from '../../../domain/transaction'
import { Do } from 'fp-ts-contrib/lib/Do'
import { addTransaction, getAllTransactions } from '../../../core/transactions'
import { TransactionRepository } from '../../../core/repositories/transaction'
import { Trace } from '../../../core/trace'
import { Monad1 } from 'fp-ts/Monad'
import { AccountId } from '../../../domain/account'

type IAddTransactionReq = FastifyRequest<{
    Body: Transaction
}>

export const addTransactionHandler =
    <F extends URIS>(C: TransactionRepository<F> & Trace<F> & Monad1<F>) =>
    (req: IAddTransactionReq, reply: FastifyReply) => {
        return Do(C)
            .do(addTransaction(C)(req.body))
            .return(() => {
                reply.status(201).send()
            })
    }

type IAllTransactionReq = FastifyRequest<{
    Params: { accountId: AccountId }
}>
export const getAllTransactionHandler =
    <F extends URIS>(C: TransactionRepository<F> & Trace<F> & Monad1<F>) =>
    (req: IAllTransactionReq, reply: FastifyReply) => {
        return Do(C)
            .bind('transactions', getAllTransactions(C)(req.params.accountId))
            .return(({ transactions }) => {
                reply.status(200).send(transactions)
            })
    }
