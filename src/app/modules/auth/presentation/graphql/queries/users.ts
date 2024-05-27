import { extendType, intArg, nonNull } from 'nexus';
import { Context } from '../../../../../graphql/context';

export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {

    t.list.field('users', {
      type: 'User',
      resolve: async (_parent, _args, ctx: Context) => {
        // ctx.request.server.diContainer.resolve('UserService')
        console.log('container', ctx.request.diScope.resolve('UserService'))
        // return []
        const userService = ctx.request.diScope.resolve('UserService');
        return userService.getAllUsers();
      },
    });
  },
});

// export default [UserQuery]

