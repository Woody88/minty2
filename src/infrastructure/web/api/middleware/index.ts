import { FastifyInstance } from 'fastify'
import { Do } from 'fp-ts-contrib/lib/Do'
import openapiGlue from 'fastify-openapi-glue'
import { openApiRouteMiddlewareOpts } from './routes'
import { task } from 'fp-ts'
import { App } from '../../../application-dependency/type'

export const runMidddelware =
    (App: App<task.URI>) =>
    (server: FastifyInstance): task.Task<FastifyInstance> =>
        Do(App)
            .bind('openApiRouteMiddlewareOpts', openApiRouteMiddlewareOpts(App))
            .return(({ openApiRouteMiddlewareOpts }) => {
                server.register(openapiGlue, openApiRouteMiddlewareOpts)
                return server
            })
