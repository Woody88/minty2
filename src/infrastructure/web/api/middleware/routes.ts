import { FastifyReply, FastifyRequest } from 'fastify'
import { FastifyOpenapiGlueOptions } from 'fastify-openapi-glue'
import { task } from 'fp-ts'
import { Do } from 'fp-ts-contrib/lib/Do'
import { App } from '../../../application-dependency/type'
import { getAllTransactionHandler } from '../transaction.handler'

export const openApiRouteMiddlewareOpts = (
    P: App<task.URI>
): task.Task<FastifyOpenapiGlueOptions> =>
    Do(P).return(() => ({
        specification: '_build/openapi.yaml',
        noAdditional: true,
        service: {
            getAllTransaction: runHandler(getAllTransactionHandler)(P),
        },
    }))

const runHandler =
    (
        handler: (
            P: App<task.URI>
        ) => (req: FastifyRequest, reply: FastifyReply) => task.Task<void>
    ) =>
    (P: App<task.URI>) =>
    (req: FastifyRequest, reply: FastifyReply) => {
        return handler(P)(req, reply)()
    }
