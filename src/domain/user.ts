import * as t from 'io-ts'
import { Id, IdBrand } from './common/id'

const UserProps = t.type({
  first_name: t.string,
  last_name: t.string,
  username: t.string,
})

const UserOptions = t.partial({ phone_number: t.string })

const UserPassword = t.type({ password: t.string })

export const UserId = t.type({ userId: IdBrand })

export const NewUser = t.intersection([UserProps, UserOptions, UserPassword])

export const User = t.intersection([UserProps, UserOptions, UserId])

export type UserId = Id

export type NewUser = t.TypeOf<typeof NewUser>
export type User = t.TypeOf<typeof User>
