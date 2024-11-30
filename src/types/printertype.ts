import { SQLModel } from "./common.type";

export interface PrinterCreate {
  location: string;
  printer_code: string;
}

export interface PrinterModel extends PrinterCreate, SQLModel {
  status: "available" | "unavailable" | "in_maintain";
  printjob_queue: string[];
}

export interface PrinterList {
  data: PrinterModel[];
}

export interface PrinterUpdate extends PrinterCreate {
  id: string;
  data: Partial<PrinterModel>;
}

export interface UserQueryConfig {
  id?: string;
}
