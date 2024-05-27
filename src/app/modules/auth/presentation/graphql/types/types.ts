import { objectType } from 'nexus';

export const AuthType = objectType({
  name: 'Auth',
  definition(t) {
    t.string('token');
  },
});