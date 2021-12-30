import { FastifyReply, FastifyRequest } from 'fastify'
import { FastifyOpenapiGlueOptions } from 'fastify-openapi-glue'
import { task } from 'fp-ts'
import { Do } from 'fp-ts-contrib/lib/Do'
import { App } from '../../../application-dependency/type'
import {
  addTransactionHandler,
  getAllTransactionHandler,
} from '../transaction.handler'
import { createUserHandler, getUserInfoHandler } from '../user.handler'

export const openApiRouteMiddlewareOpts = (
  P: App<task.URI>
): task.Task<FastifyOpenapiGlueOptions> =>
  Do(P).return(() => ({
    specification: '_build/openapi.yaml',
    noAdditional: true,
    service: {
      getAllTransaction: runHandler(getAllTransactionHandler)(P),
      addTransaction: runHandler(addTransactionHandler)(P),
      createUser: runHandler(createUserHandler)(P),
      getUserInfo: runHandler(getUserInfoHandler)(P),
    },
  }))

const runHandler =
  (
    handler: (
      P: App<task.URI>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => (req: any, reply: FastifyReply) => task.Task<void>
  ) =>
  (P: App<task.URI>) =>
  (req: FastifyRequest, reply: FastifyReply) => {
    return handler(P)(req, reply)()
  }
