import { Kind, URIS } from 'fp-ts/HKT'
import { Either } from 'fp-ts/Either'
import type { User, UserId } from '../../domain/user'

export type UserException = string

export interface UserRepository<F extends URIS> {
  add: (user: User) => Kind<F, Either<UserException, void>>

  lookup: (userId: UserId) => Kind<F, Either<UserException, User>>
}
