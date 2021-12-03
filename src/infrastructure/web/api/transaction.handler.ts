import { FastifyReply, FastifyRequest } from 'fastify'
import { Task } from 'fp-ts/Task'
import { URIS } from 'fp-ts/HKT'
import { TransactionRepository } from '../../../core/repositories/transaction'
import * as UC from '../../../core/transaction_usecase'
import { Transaction } from '../../../domain/transaction'

type IAddTransactionReq = FastifyRequest<{
    Body: Transaction
}>

declare const addTransactionHandler: <F extends URIS>(
    TRNS: TransactionRepository<F>
) => (req: IAddTransactionReq, reply: FastifyReply) => Task<void>

declare const getAllTransactionHandler: <F extends URIS>(
    TRNS: TransactionRepository<F>
) => (req: FastifyRequest, reply: FastifyReply) => Task<void>
