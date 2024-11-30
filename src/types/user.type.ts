import { SQLModel } from "./common.type";

export interface UserCreate {
  login_id: string;
  name: string;
  authority_group: string;
  password: string;
}

export interface UserModel extends UserCreate, SQLModel {}

export interface UserList {
  data: UserModel[];
}

export interface UserLogin {
  username: string;
  password: string;
}
export interface UserQueryConfig {
  id?: string;
}
