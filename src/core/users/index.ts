import { Do } from 'fp-ts-contrib/lib/Do'
import { URIS } from 'fp-ts/HKT'
import { Monad1 } from 'fp-ts/Monad'
import { NewUser, UserId } from '../../domain/user'
import { UserRepository } from '../repositories/user'
import { Trace } from '../trace'

type Constraints<F extends URIS> = Persistence<F> & Trace<F> & Monad1<F>
type Persistence<F extends URIS> = UserRepository<F>

export const userRegistration =
  <F extends URIS>(C: Constraints<F>) =>
  (user: NewUser) =>
    Do(C)
      .bind('result', C.add(user))
      .return(({ result }) => result)

export const userInfo =
  <F extends URIS>(C: Constraints<F>) =>
  (userId: UserId) =>
    Do(C)
      .bind('user', C.lookup(userId))
      .return(({ user }) => user)
