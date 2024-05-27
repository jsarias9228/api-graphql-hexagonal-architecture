import { UserRepository } from '../../domain/UserRepository';
import { User } from '../../domain/User';

export class GetUser {
  private readonly userRepository: UserRepository;

  constructor({ userRepository } : {userRepository: UserRepository}) {
    this.userRepository = userRepository;
  }

  async execute(id: number): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }
}
