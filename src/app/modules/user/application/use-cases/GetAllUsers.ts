import { UserRepository } from '../../domain/UserRepository';
import { User } from '../../domain/User';

export class GetAllUsers {
  private readonly userRepository: UserRepository;

  constructor({ userRepository } : {userRepository: UserRepository}) {
    this.userRepository = userRepository;
  }

  async execute(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }
}
