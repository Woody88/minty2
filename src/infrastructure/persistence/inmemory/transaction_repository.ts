import { task } from 'fp-ts'
import { TransactionRepository } from '../../../core/repositories/transaction'

declare const transactionRepoIntepreter: () => TransactionRepository<task.URI>
