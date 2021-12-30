import { FastifyReply, FastifyRequest } from 'fastify'
import { URIS } from 'fp-ts/HKT'
import { Transaction } from '../../../domain/transaction'
import { Do } from 'fp-ts-contrib/lib/Do'
import {
  addTransaction,
  getAllTransactions,
  TransactionService,
} from '../../../core/transactions'
import { AccountId } from '../../../domain/account'
import { either } from 'fp-ts'
import { pipe, constVoid } from 'fp-ts/function'

type IAddTransactionReq = FastifyRequest<{
  Body: Transaction
}>

export const addTransactionHandler =
  <F extends URIS>(S: TransactionService<F>) =>
  (req: IAddTransactionReq, reply: FastifyReply) => {
    return Do(S)
      .bind('result', addTransaction(S)(req.body))
      .return(({ result }) =>
        pipe(
          result,
          either.match(
            (e) => reply.status(400).send(e),
            () => reply.status(201).send()
          ),
          constVoid
        )
      )
  }

type IAllTransactionReq = FastifyRequest<{
  Params: { accountId: AccountId }
}>

export const getAllTransactionHandler =
  <F extends URIS>(S: TransactionService<F>) =>
  (req: IAllTransactionReq, reply: FastifyReply) => {
    return Do(S)
      .bind('eTransactions', getAllTransactions(S)(req.params.accountId))
      .return(({ eTransactions }) =>
        pipe(
          eTransactions,
          either.match(
            (e) => reply.status(400).send(e),
            (transactions) => reply.status(200).send(transactions)
          ),
          constVoid
        )
      )
  }
