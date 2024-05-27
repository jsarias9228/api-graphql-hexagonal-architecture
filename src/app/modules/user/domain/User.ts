export class User {
  id: number;
  name: string;
  email: string;
  password: string

  constructor({ id, name, email, password }: any) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}