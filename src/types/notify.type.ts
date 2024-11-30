import { SQLModel } from "./common.type";
import { PrintjobModel } from "./printjob.type";

export interface NotifyCreate {
  receiver_ids: string[];
  message: string;
  printjob_id?: string;
}

export interface NotifyModel extends NotifyCreate, SQLModel {
  printjob: Partial<PrintjobModel>;
}

export interface NotifyList {
  data: NotifyModel[];
}

export interface NotifyQueryConfig {
  receiver_ids?: string[];
  printjob_id?: string;
}
