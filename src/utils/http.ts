import axios, { AxiosError, AxiosResponse, type AxiosInstance } from "axios";
import {
  clearLS,
  getAccessTokenFromLS,
  getAccessTokenFromSessionStorage,
  setAccessTokenToSessionStorage,
} from "./auth";
import config from "../configs/config";
import { ErrorRespone, SuccessReponse } from "../types/common.type";
import { HttpErrorKeys } from "../constants/httpResponeErrorKey";

const domain = config.ApiURL;
export const ApiURL = domain;

class Http {
  instance: AxiosInstance;
  private accessToken: string | null;
  constructor() {
    this.accessToken =
      getAccessTokenFromLS() || getAccessTokenFromSessionStorage();
    this.instance = axios.create({
      baseURL: ApiURL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = "Bearer " + this.accessToken;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // Add a response interceptor
    this.instance.interceptors.response.use(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (response: AxiosResponse<SuccessReponse<string>, any>) => {
        const { url } = response.config;
        if (url === "/v1/user/login") {
          const accessToken = response.data.data;
          if (accessToken !== undefined) {
            this.accessToken = accessToken;
            setAccessTokenToSessionStorage(accessToken);
          }
        }
        return response;
      },
      (error: AxiosError) => {
        const errorResponse = error.response?.data as ErrorRespone;
        const errorKey = errorResponse.error;
        if (errorKey == HttpErrorKeys.NoPermission) {
          clearLS();
          sessionStorage.clear();
          this.accessToken = null;
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
