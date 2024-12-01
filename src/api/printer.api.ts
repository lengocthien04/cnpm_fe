import http from "../utils/http";
import {
  PrinterCreate,
  PrinterModel,
  PrinterUpdate,
} from "../types/printer.type";

const url = "/v1/printer";

const printerApi = {
  updatePrinterbyID(body: PrinterUpdate) {
    return http.patch<PrinterModel>(`${url}/${body.id}`, body.data);
  },
  listPrinters() {
    return http.get<PrinterModel[]>(url);
  },
  createPrinters(body: PrinterCreate[]) {
    return http.post<PrinterModel>(url, body);
  },
};

export default printerApi;
