import { AuthRepository } from '../../domain/AuthRepository';
import bcrypt from 'bcrypt';

interface ILogin{
  authRepository: AuthRepository
}

export class Login {
  private readonly authRepository: AuthRepository
  constructor({
    authRepository
  }: ILogin) {
    this.authRepository = authRepository
  }

  async execute(email: string, password: string): Promise<any> {
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return user;
  }
}
