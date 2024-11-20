import axios, { AxiosError } from "axios";

import HttpStatusCode from "../constants/httpStatusCode.enum";

export const extractKeyFromUrl = (url: string): string => {
  const regex = /\/([^/?]+)\?/;
  const match = url.match(regex);
  return match ? match[1] : "";
};

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}

export function isAxiosBadRequestError<FormError>(
  error: unknown
): error is AxiosError<FormError> {
  return (
    isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
  );
}
