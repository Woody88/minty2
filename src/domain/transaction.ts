import * as t from 'io-ts'
import { Id, IdBrand } from './common/id'

const TransactionType = t.keyof({
    INCOME: null,
    EXPENSE: null,
})

const PaymentType = t.keyof({
    CASH: null,
    CHECK: null,
    'DEBIT/CREDIT': null,
})

interface AmountBrand {
    readonly Amount: unique symbol
}

const Amount = t.brand(
    t.number,
    (n): n is t.Branded<number, AmountBrand> => n >= 0,
    'Amount'
)

export const Transaction = t.type({
    accountId: IdBrand,
    merchant: t.string,
    transaction_type: TransactionType,
    payment_type: PaymentType,
    amount: Amount,
    category: t.string,
    date: t.string,
    notes: t.string,
})

export type TransactionId = Id
export type Transaction = t.TypeOf<typeof Transaction>
