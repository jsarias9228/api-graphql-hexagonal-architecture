import type { PrismaClient } from '@prisma/client';
import type { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';

export class PrismaUserRepository implements UserRepository {
  private readonly prismaClient: PrismaClient;

  constructor({ prismaClient } : {prismaClient: PrismaClient}) {
    this.prismaClient = prismaClient;
  }

  async createUser(user: User): Promise<User> {
    return this.prismaClient.user.create({
      data: user,
    });
  }

  async deleteUser(id: number): Promise<void> {
    await this.prismaClient.user.delete({
      where: { id },
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prismaClient.user.findUnique({
      where: { id },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.prismaClient.user.findMany();
  }

  async updateUser(user: Omit<User, 'password'>): Promise<User> {
    return this.prismaClient.user.update({
      where: { id: user.id },
      data: user,
    });
  }
}
