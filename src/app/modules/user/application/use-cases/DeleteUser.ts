import { UserRepository } from '../../domain/UserRepository';

export class DeleteUser {
  private readonly userRepository: UserRepository;

  constructor({ userRepository }: {userRepository: UserRepository}) {
    this.userRepository = userRepository;
  }

  async execute(id: number): Promise<void> {
    return this.userRepository.deleteUser(id);
  }
}
