import { task, taskEither, map, string, either } from 'fp-ts'
import { Do } from 'fp-ts-contrib/lib/Do'
import { Either } from 'fp-ts/Either'
import { constVoid, pipe } from 'fp-ts/function'
import { UserRepository } from '../../../core/repositories/user'
import { User, UserId } from '../../../domain/user'

export const userRepoIntepreter = (): UserRepository<task.URI> => {
  const dbFake: Map<UserId, User> = new Map()

  const lookUpById = (userId: UserId): Either<string, User> =>
    pipe(
      map.lookup(string.Eq)(userId)(dbFake),
      either.fromOption(() => 'Invalid Id')
    )

  return {
    ...task.Monad,
    add: (user) =>
      Do(taskEither.Monad)
        .do(taskEither.of(dbFake.set(user.userId, user)))
        .return(constVoid),
    lookup: (userId) =>
      Do(taskEither.Monad)
        .bind('user', taskEither.fromEither(lookUpById(userId)))
        .return(({ user }) => user),
  }
}
