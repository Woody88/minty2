import fastify, { FastifyInstance } from 'fastify'
import { task } from 'fp-ts'
import { Do } from 'fp-ts-contrib/lib/Do'
import { Task } from 'fp-ts/Task'
import type { App } from '../../application-dependency/type'
import { runMidddelware } from '../api/middleware'

export const createServer = (App: App<task.URI>): Task<FastifyInstance> =>
    Do(task.MonadTask)
        .bindL(
            'server',
            () => async () => fastify({ logger: { level: 'info' } })
        )
        .doL(({ server }) => runMidddelware(App)(server))
        .doL(({ server }) => {
            server.setErrorHandler((error, request, reply) => {
                const responseTimeStamp = reply.getResponseTime()

                const response = {
                    requestId: request.id,
                    path: request.routerPath,
                    message: error.message,
                    responseTimeStamp,
                }
                console.log(error)
                reply.log.error(response)
                if (error.validation && error.validation.length > 0) {
                    // const path = error.validation[0].dataPath
                    // const field = path.charAt(1).toUpperCase() + path.slice(2)
                    // const message = `${field} ${error.validation[0].message}`
                    reply.status(422).send({
                        errorCode: 'OpenAPI Validation',
                        message: response.message,
                        validation: error.validation,
                    })
                } else {
                    reply
                        .status(500)
                        .send(
                            'Internal server error, please contact administrator.'
                        )
                }
            })
            return task.of(void 0)
        })
        .return(({ server }) => server)
