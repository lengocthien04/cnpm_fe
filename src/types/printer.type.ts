import { SQLModel } from "./common.type";

export interface PrinterCreate {
  location: string;
  printer_code: string;
}

export type PrinterStatus = "available" | "in_maintain";

export interface PrinterModel extends PrinterCreate, SQLModel {
  status: PrinterStatus;
  printjob_queue: string[];
}

export interface PrinterList {
  data: PrinterModel[];
}

export interface PrinterUpdate {
  id: string;
  data: Partial<PrinterModel>;
}

export interface UserQueryConfig {
  id?: string;
}
