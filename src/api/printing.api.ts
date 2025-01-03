import http from "../utils/http";
import { PrinterModel } from "../types/printer.type";
import {
  PrintingSettings,
  PrintingSettingsUpdate,
} from "../types/printing.type";
import { PrintingReport } from "../types/report.type";

const url = "/v1/printing-config";
const reportURL = "/v1/report/this-month";

const printingApi = {
  getPrintingSettings() {
    return http.get<PrintingSettings>(url);
  },
  updatePrice(body: PrintingSettingsUpdate) {
    return http.patch<PrinterModel[]>(`${url}/update-price`, body);
  },
  updatePrintTime(body: PrintingSettingsUpdate) {
    return http.patch<PrinterModel[]>(`${url}/update-printing-time`, body);
  },
  updateFiles(body: PrintingSettingsUpdate) {
    return http.patch<PrinterModel[]>(`${url}/update-allowed-files`, body);
  },

  getReportOfThisMonth() {
    return http.get<PrintingReport>(reportURL);
  },
};

export default printingApi;
