import { SetupInstanceModel, SQLModel } from "./common.type";
import { Pagination, PagingQueryConfig } from "./paging.type";

export interface UserCreate {
  company_code: number;
  login_id: string;
  name: string;
  authority_group: string;
  password: string;
  pic_code?: string;
  pic_number?: string;
  phone?: string;
  affiliation?: string;
  location?: string;
  department?: string;
  date_of_employment?: string;
  zip_code?: string;
  address_name?: string;
  address_number?: string;
  telephone?: string;
}

export interface UserModel extends UserCreate, SQLModel {}

export interface UserListResponse extends Pagination {
  data: UserModel[];
}

export interface UserLogin {
  company_code: number;
  login_id: string;
  password: string;
}

export interface UserUpdate {
  id: string;
  data: Partial<UserCreate>;
}

export function isUserModel(row: SetupInstanceModel): row is UserModel {
  return "login_id" in row;
}

export interface UserQueryConfig extends PagingQueryConfig {
  keyword?: string;
}
