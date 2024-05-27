// import fp from 'fastify-plugin';
// import { FastifyInstance } from 'fastify';
// import { readdirSync } from 'fs';
// import { join } from 'path';

// // Obtener la lista de todos los módulos disponibles
// const moduleNames = readdirSync(join(__dirname, '../modules'));

// // Crear una interfaz para representar los servicios de cada módulo
// type ModuleServiceCreator = (prisma: any) => any; // Cambia `any` por el tipo correcto de tu instancia de Prisma

// type ServiceMap = {
//   [K in typeof moduleNames[number] as `${K}Services`]: ReturnType<ModuleServiceCreator>;
// };

// // Unificar los tipos de los servicios de todos los módulos
// type Services = ServiceMap[keyof ServiceMap];

// declare module 'fastify' {
//   interface FastifyInstance {
//     container: any;
//   }
// }

// export const dependencyInjectionPlugin = fp(async (fastify: FastifyInstance) => {
//   // Construir el mapa de servicios
//   const serviceMap: ServiceMap = {};

//   for (const moduleName of moduleNames) {
//     const modulePath = `../modules/${moduleName}`;
//     const module = require(modulePath);
//     serviceMap[`${moduleName}Services`] = module.createModule(fastify.prisma);
//   }

//   // Unificar los servicios en un solo objeto
//   const services: Services = Object.values(serviceMap).reduce((acc, val) => ({ ...acc, ...val }), {});

//   // Decorar el objeto FastifyInstance con el mapa de servicios
//   fastify.decorate('services', services);
// });
import fp from 'fastify-plugin';
// import { createContainer, asValue } from 'awilix';
import { FastifyInstance } from 'fastify';
import { diContainer, fastifyAwilixPlugin } from '@fastify/awilix';
import { createUserContainer } from '../modules/user'
import { createAuthContainer } from '../modules/auth'
import { asClass, Lifetime } from 'awilix';

// export const dependencyInjectionPlugin = fp(async (fastify: FastifyInstance) => {
  
//   const userContainer = createUserContainer(fastify.prisma)
//   // Create the main container
//   const container = createContainer();

//   // Register module containers
//   container.register({
//     userService: asValue(userContainer.resolve('userService')), // Register the module container
//   });
//   // fastify.register(fastifyAwilixPlugin, {
//   //   disposeOnClose: true, 
//   //   disposeOnResponse: true,
//   //   strictBooleanEnforced: true
//   // })
//   // Decorar el objeto FastifyInstance con el mapa de servicios

//   fastify.decorate('container', container);
// });
declare module '@fastify/awilix' {
  interface Cradle {
    app: FastifyInstance
  }
  // interface RequestCradle {
  //   user: User
  // }
}
export const dependencyInjectionPlugin = fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyAwilixPlugin, { disposeOnClose: true, disposeOnResponse: true });
  createUserContainer()
  createAuthContainer(fastify)
})