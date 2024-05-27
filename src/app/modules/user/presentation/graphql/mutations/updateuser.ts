import { extendType, stringArg, nonNull, intArg } from 'nexus';
import { Context } from '../../../../../graphql/context';

export const updateUserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateUser', {
      type: 'User',
      args: {
        id: nonNull(intArg()),
        name: stringArg(),
        email: stringArg(),
      },
      resolve: async (_parent, { id, name, email }, ctx: Context) => {
        const userService = ctx.request.diScope.resolve('userService');
        return userService.updateUser({ id, name, email });
      },
    });
  },
});

// export default [UserMutation]