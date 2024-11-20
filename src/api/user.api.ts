import http from "../utils/http";
import {
  UserCreate,
  UserLogin,
  UserModel,
  UserQueryConfig,
  UserUpdate,
} from "../types/user.type";
import { PagingResponse, SuccessReponse } from "../types/common.type";

const url = "/v1/user";

const userApi = {
  userLogin(body: UserLogin) {
    return http.post<SuccessReponse<string>>(`${url}/login`, body);
  },
  createMultipleUsers(body: UserCreate[]) {
    return http.post<string>(url, body);
  },
  listUsers(params: UserQueryConfig) {
    return http.get<PagingResponse<UserModel[]>>(url, { params });
  },
  getUserById(id: string) {
    return http.get<SuccessReponse<UserModel>>(`${url}/${id}`);
  },

  updateUserById(body: UserUpdate) {
    return http.put<UserModel>(`${url}/${body.id}`, body.data);
  },
  deleteUsers(ids: string[]) {
    const requestBody = {
      id: ids,
    };
    return http.delete<string>(url, { data: requestBody });
  },
};

export default userApi;
