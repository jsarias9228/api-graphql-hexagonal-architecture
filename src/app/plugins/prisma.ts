import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { 
  diContainer, // this is an alias for diContainerProxy
  diContainerClassic, // this instance will be used for `injectionMode = 'CLASSIC'`
  diContainerProxy // this instance will be used by default
} from '@fastify/awilix'
const { asValue, asFunction, Lifetime } = require('awilix')

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
// declare module 'fastify' {
//   interface FastifyInstance {
//     prismaClient: PrismaClient
//   }
// }
declare module '@fastify/awilix' {
  interface Cradle {
    prismaClient: PrismaClient
  }
  // interface RequestCradle {
  //   user: User
  // }
}

const prismaPlugin: FastifyPluginAsync = fp(async (server) => {
  const prisma = new PrismaClient({
    log: ['error', 'warn']
  })
  
  await prisma.$connect()
  
  // Make Prisma Client available through the fastify server instance: server.prisma
  // server.decorate('prisma', prisma)
  diContainer.register({
    prismaClient: asValue(prisma, {
      lifetime: Lifetime.SINGLETON,
      dispose: (module) => module.dispose(),
    }),
  })

  server.addHook('onClose', async (server) => {
    server.log.info('disconnecting Prisma from DB')
    // await server.
    // await server.prisma.$disconnect()
  })
})

export default prismaPlugin
