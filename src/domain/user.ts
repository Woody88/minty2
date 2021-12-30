import * as t from 'io-ts'
import { Id, IdBrand } from './common/id'

const UserProps = t.type({
  first_name: t.string,
  last_name: t.string,
  username: t.string,
})

const UserOptions = t.partial({ phone_number: t.string })

const UserPassword = t.type({ password: t.string })

const UserId = t.type({ userId: IdBrand })

export const UserRegistration = t.intersection([
  UserProps,
  UserOptions,
  UserPassword,
])

export const User = t.intersection([UserProps, UserOptions, UserId])

export type UserId = Id
export type UserRegistration = t.TypeOf<typeof UserRegistration>
export type User = t.TypeOf<typeof User>
