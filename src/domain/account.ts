import * as t from 'io-ts'
import { Id, IdBrand } from './common/id'

const Account = t.type({
    id: IdBrand,
    active: t.boolean,
    username: t.string,
    password: t.string,
})

export type AccountId = Id
export type Account = t.TypeOf<typeof Account>
