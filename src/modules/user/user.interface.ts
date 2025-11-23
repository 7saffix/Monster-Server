export enum Role {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Role;
}
