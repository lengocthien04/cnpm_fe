import http from "../utils/http";
import { SuccessReponse } from "../types/common.type";
import {
  PrinterCreate,
  PrinterModel,
  PrinterUpdate,
} from "../types/printertype";

const url = "/v1/printer";

const printerApi = {
  updatePrinterbyID(body: PrinterUpdate) {
    return http.put<PrinterModel>(`${url}/${body.id}`, body.data);
  },
  listPrinters() {
    return http.get<SuccessReponse<PrinterModel[]>>(url);
  },
  createPrinters(body: PrinterCreate[]) {
    return http.post<SuccessReponse<PrinterModel>>(url, body);
  },
};

export default printerApi;
