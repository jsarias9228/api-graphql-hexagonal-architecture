import { User } from './User';

export interface UserRepository {
  createUser(user: User): Promise<User>;
  deleteUser(id: number): Promise<void>;
  getUserById(id: number): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  updateUser(user: Omit<User, 'password'>): Promise<User>;
}
