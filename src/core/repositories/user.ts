import { Kind, URIS } from 'fp-ts/HKT'
import { Either } from 'fp-ts/Either'
import type { NewUser, User, UserId } from '../../domain/user'

export type UserException = string

export interface UserRepository<F extends URIS> {
  add: (user: NewUser) => Kind<F, Either<UserException, void>>

  lookup: (userId: UserId) => Kind<F, Either<UserException, User>>
}
