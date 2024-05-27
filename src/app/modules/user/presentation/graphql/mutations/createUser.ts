import { extendType, stringArg, nonNull, intArg } from 'nexus';
import { Context } from '../../../../../graphql/context';

export const createUserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: 'User',
      args: {
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, { name, email, password }, ctx: Context) => {
        const userService = ctx.request.diScope.resolve('userService');
        return userService.createUser({ id: 0, name, email, password });
      },
    });
  },
});

// export default [UserMutation]