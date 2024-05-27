import { FastifyInstance } from 'fastify';

export class GenerateToken {
  private readonly app
  constructor({ app } : { app: FastifyInstance }) {
    this.app = app
  }

  execute(userId: string): string {
    return this.app.jwt.sign({ userId });
  }
}
