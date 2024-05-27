import { extendType, nonNull, stringArg } from 'nexus';
import { Context } from '../../../../../graphql/context';

// export const AuthMutations = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.field('login', {
//       type: 'Auth',
//       args: {
//         email: nonNull(stringArg()),
//         password: nonNull(stringArg()),
//       },
//       resolve: async (_parent, { email, password }, ctx: Context) => {
//         // const token = await ctx.services.authService.login(email, password);
//         return { token };
//       },
//     });
//   },
// });
export const AuthMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('login', {
      type: 'Auth',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, { email, password }, ctx: Context) => {
        const authService = ctx.request.diScope.resolve('authService');
        const token = await authService.login(email, password);
        return { token }
      },
    });
  },
})