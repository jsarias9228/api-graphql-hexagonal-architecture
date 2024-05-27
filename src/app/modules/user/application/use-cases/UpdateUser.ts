import { UserRepository } from '../../domain/UserRepository';
import { User } from '../../domain/User';

export class UpdateUser {
  private readonly userRepository: UserRepository;

  constructor({ userRepository }:{userRepository: UserRepository}) {
    this.userRepository = userRepository;
  }

  async execute(user: Omit<User, 'password'>): Promise<User> {
    return this.userRepository.updateUser(user);
  }
}
