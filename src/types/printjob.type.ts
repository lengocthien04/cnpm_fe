import { SQLModel } from "./common.type";
import { FileModel } from "./file.type";
import { PrinterModel } from "./printer.type";

export interface PrintjobCreate {
  file_id: string;
  user_id: string;
  printer_id: string;
  page_size: number[];
  duplex: boolean;
  copies: number;
  date?: string;
}

export interface PrintjobModel extends PrintjobCreate, SQLModel {
  file: FileModel;
  num_pages: number;
  printer: PrinterModel;
  print_status: string;
}

export interface UserList {
  data: PrintjobModel[];
}

export interface PrintjobQueryConfig {
  date?: string[];
  user_id?: string;
  file_id?: string;
  printer_id?: string;
}
