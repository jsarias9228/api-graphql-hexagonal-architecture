import { CreateUser } from '../use-cases/CreateUser';
import { DeleteUser } from '../use-cases/DeleteUser';
import { GetUser } from '../use-cases/GetUser';
import { GetAllUsers } from '../use-cases/GetAllUsers';
import { UpdateUser } from '../use-cases/UpdateUser';
import { User } from '../../domain/User';
interface IUserService {
  createUser: CreateUser,
  deleteUser: DeleteUser,
  getUser: GetUser,
  getAllUsers: GetAllUsers,
  updateUser: UpdateUser
}

export class UserService {
  private readonly createUserCase: CreateUser;
  private readonly deleteUserCase: DeleteUser;
  private readonly getUserCase: GetUser;
  private readonly getAllUsersCase: GetAllUsers;
  private readonly updateUserCase: UpdateUser;

  constructor({
    createUser,
    deleteUser,
    getUser,
    getAllUsers,
    updateUser
  }:IUserService) {
    this.createUserCase = createUser;
    this.deleteUserCase = deleteUser;
    this.getUserCase = getUser;
    this.getAllUsersCase = getAllUsers;
    this.updateUserCase = updateUser;
  }

  async createUser(user: User): Promise<User> {
    return this.createUserCase.execute(user);
  }

  async deleteUser(id: number): Promise<void> {
    return this.deleteUserCase.execute(id);
  }

  async getUserById(id: number): Promise<User | null> {
    return this.getUserCase.execute(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.getAllUsersCase.execute();
  }

  async updateUser(user: Omit<User, 'password'>): Promise<User> {
    return this.updateUserCase.execute(user);
  }
}