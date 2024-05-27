import type { PrismaClient } from '@prisma/client';
import { asClass, Lifetime } from 'awilix';
import { diContainer } from '@fastify/awilix';
import { PrismaAuthRepository } from './infrastructure/PrismaAuthRepository';
import { ValidateToken } from './application/use-cases/ValidateToken';
import { GenerateToken } from './application/use-cases/GenerateToken';
import { Login } from './application/use-cases/Login';
import { AuthService } from './application/services/AuthService';
import { FastifyInstance } from 'fastify';


declare module '@fastify/awilix' {
  interface Cradle {
    authService: AuthService
    authRepository: PrismaAuthRepository
    validateToken: ValidateToken,
    generateToken: GenerateToken,
    login: Login,
  }
  // interface RequestCradle {
  //   user: User
  // }
}
export const createAuthContainer = (fastify: FastifyInstance) => {
  diContainer.register({
    authRepository: asClass(PrismaAuthRepository, {
      lifetime: Lifetime.SINGLETON,
      // dispose: (module) => module.dispose(),
    }),
    validateToken: asClass(ValidateToken, {
      lifetime: Lifetime.SINGLETON,
      // dispose: (module) => module.dispose(),
    }).inject(() => ({
      app: fastify
    })),
    generateToken: asClass(GenerateToken, {
      lifetime: Lifetime.SINGLETON,
      // dispose: (module) => module.dispose(),
    }).inject(() => ({
      app: fastify
    })),
    login: asClass(Login, {
      lifetime: Lifetime.SINGLETON,
      // dispose: (module) => module.dispose(),
    }),
    authService: asClass(AuthService, {
      lifetime: Lifetime.SINGLETON,
      // dispose: (module) => module.dispose(),
    }),
  })
}