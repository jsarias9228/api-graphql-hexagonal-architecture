import { extendType, intArg, nonNull } from 'nexus';
import { Context } from '../../../../../graphql/context';

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('user', {
      type: 'User',
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_parent, { id }, ctx: Context) => {
        const userService = ctx.request.diScope.resolve('userService');
        return userService.getUserById(id);
      },
    });
  },
});

// export default [UserQuery]

