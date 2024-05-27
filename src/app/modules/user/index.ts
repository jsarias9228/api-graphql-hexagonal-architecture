import type { PrismaClient } from '@prisma/client';
import { asClass, Lifetime } from 'awilix';
import { diContainer } from '@fastify/awilix';
import { PrismaUserRepository } from './infrastructure/PrismaUserRepository';
import { CreateUser } from './application/use-cases/CreateUser';
import { DeleteUser } from './application/use-cases/DeleteUser';
import { GetUser } from './application/use-cases/GetUser';
import { GetAllUsers } from './application/use-cases/GetAllUsers';
import { UpdateUser } from './application/use-cases/UpdateUser';
import { UserService } from './application/services/UserService';


// export function createModule(prisma: PrismaClient) {
//   const userRepository = new PrismaUserRepository(prisma);
//   const createUser = new CreateUser(userRepository);
//   const deleteUser = new DeleteUser(userRepository);
//   const getUser = new GetUser(userRepository);
//   const getAllUsers = new GetAllUsers(userRepository);
//   const updateUser = new UpdateUser(userRepository);
//   const userService = new UserService(createUser, deleteUser, getUser, getAllUsers, updateUser);

//   return {
//     userService,
//   };
// }
// interface ICradle {
//   prisma: PrismaClient
//   userPrismaRepository: PrismaUserRepository
//   createUser: CreateUser
//   deleteUser: DeleteUser
//   getUser: GetUser
//   getAllUsers: GetAllUsers
//   updateUser: UpdateUser
//   userService: UserService
// }

// export const createUserContainer = (prisma: PrismaClient): AwilixContainer => {
//   // container.
//   const container = createContainer<ICradle>()
//   // container.loadModules()
//   // Register Prisma instance
//   container.register({
//     prisma: asValue(prisma),
//   })
//   // Register repositories
//   container.register({
//     userPrismaRepository: asClass(PrismaUserRepository).singleton(),
//   }).resolve('userPrismaRepository');
//   // Register use-cases
//   container.register({
//     createUser: asClass(CreateUser).singleton(),
//     deleteUser: asClass(DeleteUser).singleton(),
//     getUser: asClass(GetUser).singleton(),
//     getAllUsers: asClass(GetAllUsers).singleton(),
//     updateUser: asClass(UpdateUser).singleton(),
//   }).resolve('userUseCases');
//   // Register services
//   container.register({
//     userService: asClass(UserService).singleton(),
//   }).resolve('userService');
//   return container
// }
// export const createUserContainer = (prisma: PrismaClient) => {
//   const container = createContainer()
//   container.register({
//     prisma: asValue(prisma),
//   })
//     // Register repositories
//   container.register({
//     userPrismaRepository: asClass(PrismaUserRepository).singleton(),
//   });
//   // Register use-cases
//   container.register({
//     createUser: asClass(CreateUser).singleton(),
//     deleteUser: asClass(DeleteUser).singleton(),
//     getUser: asClass(GetUser).singleton(),
//     getAllUsers: asClass(GetAllUsers).singleton(),
//     updateUser: asClass(UpdateUser).singleton(),
//   });
//   // Register services
//   container.register({
//     userService: asClass(UserService).singleton(),
//   });
//   return container
// }

declare module '@fastify/awilix' {
  interface Cradle {
    userService: UserService
    userRepository: PrismaUserRepository
    createUser: CreateUser,
    deleteUser: DeleteUser,
    getUser: GetUser,
    getAllUsers: GetAllUsers,
    updateUser: UpdateUser
  }
  // interface RequestCradle {
  //   user: User
  // }
}
export const createUserContainer = () => {
  diContainer.register({
    userRepository: asClass(PrismaUserRepository, {
      lifetime: Lifetime.SINGLETON,
      // dispose: (module) => module.dispose(),
    }),
    getAllUsers: asClass(GetAllUsers, {
      lifetime: Lifetime.SINGLETON,
      // dispose: (module) => module.dispose(),
    }),
    createUser: asClass(CreateUser, {
      lifetime: Lifetime.SINGLETON,
      // dispose: (module) => module.dispose(),
    }),
    deleteUser: asClass(DeleteUser, {
      lifetime: Lifetime.SINGLETON,
      // dispose: (module) => module.dispose(),
    }),
    getUser: asClass(GetUser, {
      lifetime: Lifetime.SINGLETON,
      // dispose: (module) => module.dispose(),
    }),
    updateUser: asClass(UpdateUser, {
      lifetime: Lifetime.SINGLETON,
      // dispose: (module) => module.dispose(),
    }),
    userService: asClass(UserService, {
      lifetime: Lifetime.SINGLETON,
      // dispose: (module) => module.dispose(),
    }),
  })
}