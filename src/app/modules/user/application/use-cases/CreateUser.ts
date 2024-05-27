import { UserRepository } from '../../domain/UserRepository';
import { hash } from 'bcrypt';
import { User } from '../../domain/User';

export class CreateUser {
  private readonly userRepository: UserRepository;

  constructor({ userRepository } : {userRepository: UserRepository}) {
    this.userRepository = userRepository;
  }

  async execute(user: User): Promise<User> {
    const hashPassword = await hash(user.password, 10)
    return this.userRepository.createUser({...user, password: hashPassword});
  }
}
