import http from "../utils/http";
import { UserCreateDto, UserLogin, UserModel } from "../types/user.type";
import { PrintjobModel } from "../types/printjob.type";

const url = "/v1/user";

const userApi = {
  userLogin(body: UserLogin) {
    return http.post<string>(`${url}/login`, body);
  },

  createMultipleUsers(body: UserCreateDto[]) {
    return http.post<UserModel[]>(`${url}/create-users`, body);
  },

  getMe() {
    return http.get<UserModel>(`${url}`);
  },

  deleteUsers(ids: string[]) {
    const requestBody = {
      id: ids,
    };
    return http.delete<string>(url, { data: requestBody });
  },
  listUsers() {
    return http.get<UserModel[]>(`${url}/list`);
  },
  listUserPrintLogs() {
    return http.get<PrintjobModel[]>(`${url}/printlogs`);
  },
  getUserById(id: string) {
    return http.get<UserModel>(`${url}/${id}`);
  },
};

export default userApi;
