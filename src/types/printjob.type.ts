import { SQLModel } from "./common.type";

export interface PrintjobCreate {
  file_id: string;
  user_id: string;
  printer_id: string;
  page_size: string;
  duplex: string;
  copies: number;
  date?: string;
}

export interface PrintjobModel extends PrintjobCreate, SQLModel {}

export interface UserList {
  data: PrintjobModel[];
}

export interface PrintjobQueryConfig {
  date?: string[];
}
