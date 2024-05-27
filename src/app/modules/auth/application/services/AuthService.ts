import { GenerateToken } from '../use-cases/GenerateToken';
import { ValidateToken } from '../use-cases/ValidateToken';
import { Login } from '../use-cases/Login';
interface IAuthService {
  generateToken: GenerateToken,
  validateToken: ValidateToken,
  login: Login
}
export class AuthService {
  private readonly generateTokenCase: GenerateToken
  private readonly validateTokenCase: ValidateToken
  private readonly loginCase: Login
  constructor({
    generateToken,
    validateToken,
    login
  } : IAuthService) {
    this.generateTokenCase = generateToken
    this.validateTokenCase = validateToken
    this.loginCase = login
  }

  generateToken(userId: string): string {
    return this.generateTokenCase.execute(userId);
  }

  validateToken(token: string): any {
    return this.validateTokenCase.execute(token);
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.loginCase.execute(email, password);
    return this.generateTokenCase.execute(user.id);
  }
}
