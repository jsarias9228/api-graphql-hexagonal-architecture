import { extendType, intArg, nonNull } from 'nexus';
import { Context } from '../../../../../graphql/context';

export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {

    t.list.field('users', {
      type: 'User',
      resolve: async (_parent, _args, ctx: Context) => {
        const userService = ctx.request.diScope.resolve('userService');
        return userService.getAllUsers();
      },
    });
  },
});

// export default [UserQuery]

