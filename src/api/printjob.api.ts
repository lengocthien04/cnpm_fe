import {
  PrintjobCreate,
  PrintjobModel,
  PrintjobQueryConfig,
} from "../types/printjob.type";
import http from "../utils/http";

const url = "/v1/printjob";
const printjobApi = {
  createMultiplePrintjobs(data: PrintjobCreate[]) {
    return http.post<PrintjobModel>(url, data);
  },
  listPrintJob(params: PrintjobQueryConfig) {
    return http.get<PrintjobModel[]>(url, { params });
  },
  getPrintjobById(id: string) {
    return http.get<PrintjobModel>(`${url}/${id}`);
  },
  deletePrintjob(ids: string[]) {
    return http.delete<string>(url, { data: ids });
  },
};
export default printjobApi;
