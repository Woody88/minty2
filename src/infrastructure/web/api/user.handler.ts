import { FastifyReply, FastifyRequest } from 'fastify'
import { either } from 'fp-ts'
import { Do } from 'fp-ts-contrib/lib/Do'
import { URIS } from 'fp-ts/HKT'
import { constVoid, pipe } from 'fp-ts/function'
import { userInfo, userRegistration, UserService } from '../../../core/users'
import { UserId, UserRegistration } from '../../../domain/user'

type IUserRegistration = FastifyRequest<{
  Body: UserRegistration
}>

export const createUserHandler =
  <F extends URIS>(S: UserService<F>) =>
  (req: IUserRegistration, reply: FastifyReply) =>
    Do(S)
      .bind('eUserId', userRegistration(S)(req.body))
      .return(({ eUserId }) =>
        pipe(
          eUserId,
          either.match(
            (e) => reply.status(400).send(e),
            (userId) => reply.status(201).send(userId)
          ),
          constVoid
        )
      )

type IUserInfo = FastifyRequest<{
  Params: { userId: UserId }
}>

export const getUserInfoHandler =
  <F extends URIS>(S: UserService<F>) =>
  (req: IUserInfo, reply: FastifyReply) =>
    Do(S)
      .bind('eUserInfo', userInfo(S)(req.params.userId))
      .return(({ eUserInfo }) =>
        pipe(
          eUserInfo,
          either.match(
            (e) => reply.status(400).send(e),
            (user) => reply.status(200).send(user)
          ),
          constVoid
        )
      )
