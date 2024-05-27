import type { PrismaClient } from '@prisma/client';
import { AuthRepository } from '../domain/AuthRepository';

export class PrismaAuthRepository implements AuthRepository {
  private readonly prismaClient: PrismaClient;
  constructor({ prismaClient }: { prismaClient: PrismaClient}) {
    this.prismaClient = prismaClient
  }

  async findUserByEmail(email: string): Promise<any> {
    return this.prismaClient.user.findUnique({ where: { email } });
  }
}
