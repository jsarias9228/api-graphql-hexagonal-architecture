import { extendType, stringArg, nonNull, intArg } from 'nexus';
import { Context } from '../../../../../graphql/context';

export const deleteUserMutation = extendType({
  type: 'Mutation',
  definition(t) {

    t.field('deleteUser', {
      type: 'User',
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_parent, { id }, ctx: Context) => {
        const userService = ctx.request.diScope.resolve('userService');
        await userService.deleteUser(id);
        return { id, name: '', email: '' };
      },
    });
  },
});

// export default [UserMutation]