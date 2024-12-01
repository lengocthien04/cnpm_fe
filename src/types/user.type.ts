import { SQLModel } from "./common.type";

export interface UserCreate {
  login_id: string;
  name: string;
  username: string;
  authority_group: string;
  password: string;
  available_pages: number;
}

export interface UserCreateDto {
  name: string;
  username: string;
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

export interface UserAddPage {
  id: string;
  pages: number;
}

export interface UserQueryConfig {
  id?: string;
}
