import { FastifyReply, FastifyRequest } from 'fastify'
import { URIS } from 'fp-ts/HKT'
import { Transaction } from '../../../domain/transaction'
import { Do } from 'fp-ts-contrib/lib/Do'
import { constVoid } from 'fp-ts/function'
import { getAllTransactions } from '../../../core/transactions'
import { TransactionRepository } from '../../../core/repositories/transaction'
import { Trace } from '../../../core/trace'
import { Monad1 } from 'fp-ts/Monad'

type IAddTransactionReq = FastifyRequest<{
    Body: Transaction
}>

export declare const addTransactionHandler: <F extends URIS>(
    C: TransactionRepository<F> & Trace<F> & Monad1<F>
) => (req: IAddTransactionReq, reply: FastifyReply) => Promise<void>

export const getAllTransactionHandler =
    <F extends URIS>(C: TransactionRepository<F> & Trace<F> & Monad1<F>) =>
    (req: FastifyRequest, reply: FastifyReply) => {
        return Do(C)
            .bind('transactions', getAllTransactions(C))
            .return(({ transactions }) => {
                reply.status(200).send(transactions)
                return constVoid()
            })
    }
