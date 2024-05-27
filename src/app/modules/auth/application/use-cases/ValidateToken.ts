import type { FastifyInstance } from 'fastify';

export class ValidateToken {
  private readonly app
  constructor({ app } : { app: FastifyInstance }) {
    this.app = app
  }

  execute(token: string): any {
    try {
      return this.app.jwt.verify(token);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
