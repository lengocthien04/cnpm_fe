import { SuccessReponse } from "../types/common.type";
import {
  NotifyCreate,
  NotifyModel,
  NotifyQueryConfig,
} from "../types/notify.type";

import http from "../utils/http";

const url = "/v1/notify";
const notifyApi = {
  createNotify(data: NotifyCreate) {
    return http.post<NotifyModel>(url, data);
  },
  listNotify(params: NotifyQueryConfig) {
    return http.get<NotifyModel[]>(url, { params });
  },
  getNotifyById(id: string) {
    return http.get<SuccessReponse<NotifyModel>>(`${url}/${id}`);
  },
  deleteNotify(ids: string[]) {
    return http.delete<string>(url, { data: ids });
  },
};
export default notifyApi;
