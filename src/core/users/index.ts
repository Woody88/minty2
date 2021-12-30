import { Do } from 'fp-ts-contrib/lib/Do'
import { Kind, URIS } from 'fp-ts/HKT'
import { Monad1 } from 'fp-ts/Monad'
import { User, UserId, UserRegistration } from '../../domain/user'
import { UserRepository } from '../repositories/user'
import { Trace } from '../trace'
import { v4 as uuidv4 } from 'uuid'
import { Id } from '../../domain/common/id'
import { either } from 'fp-ts'
import { constant } from 'fp-ts/function'
import { Either } from 'fp-ts/Either'

export type UserService<F extends URIS> = Persistence<F> & Trace<F> & Monad1<F>

type Persistence<F extends URIS> = {
  persistence: {
    user: UserRepository<F>
  }
}

export const userRegistration =
  <F extends URIS>(S: UserService<F>) =>
  (userDetails: UserRegistration): Kind<F, Either<string, UserId>> =>
    Do(S)
      .let('userId', uuidv4() as Id)
      .doL(({ userId }) => S.trace(`Generated new user Id: ${userId}`))
      .letL('user', ({ userId }) => ({ ...userDetails, userId }))
      .doL(({ userId }) => S.trace(`Registrating user: ${userId}`))
      .bindL('result', ({ user }) => S.persistence.user.add(user))
      .return(({ result, userId }) => either.map(constant(userId))(result))

export const userInfo =
  <F extends URIS>(S: UserService<F>) =>
  (userId: UserId): Kind<F, Either<string, User>> =>
    Do(S)
      .do(S.trace(`Retrieving user: ${userId}`))
      .bind('user', S.persistence.user.lookup(userId))
      .return(({ user }) => user)
