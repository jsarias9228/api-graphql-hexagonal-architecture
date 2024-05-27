import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import fp from 'fastify-plugin'
import mercurius from 'mercurius'
import { schema } from './schema'
import { Context } from './context'
// import { authenticateRequest } from '../middleware/authenticate'

export default fp(async function (fastify: FastifyInstance) {
  fastify.register(mercurius, {
    schema,
    path: '/graphql',
    graphiql: true,
    context: async (
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<Context> => {
      const requiresAuthentication = request.headers.authorization !== undefined

      if (requiresAuthentication) {
        try {
          // Lógica de autenticación
          // const user = await authenticateRequest(fastify.prisma, request)

          // Devuelve el contexto con el usuario autenticado
          return { prisma: fastify.prisma, request, reply }
        } catch (error) {
          // Manejo de errores de autenticación
          if (error.message === 'Token expired') {
            // Token expirado: Unauthorized (401)
            reply.code(401)
          } else {
            // Otro error: Internal Server Error (500)
            reply.code(500)
          }

          throw new Error(error.message)
        }
      } else {
        return { container: fastify.container, request, reply,  }
      }
    }
  })
})
