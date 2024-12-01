import axios, { AxiosError } from "axios";

import HttpStatusCode from "../constants/httpStatusCode.enum";
import { PrintingHistoryQueryConfig } from "../types/printinghistory.type";

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

export const convertToStringParams = (
  config:
    | PrintingHistoryQueryConfig
    | Record<string, string | string[] | undefined> = {}
): Record<string, string | string[]> => {
  const result: Record<string, string | string[]> = {};

  for (const [key, value] of Object.entries(config)) {
    if (Array.isArray(value)) {
      result[key] = value;
    } else if (value !== undefined) {
      result[key] = String(value);
    }
  }

  return result;
};

export const removeSpecialCharacter = (str: string) =>
  str.replace(
    // eslint-disable-next-line no-useless-escape
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ""
  );

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, "-") + `-id:${id}`;
};

export const getIdFromUrl = (idString: string) => {
  const arr = idString.split("id:");
  return arr[arr.length - 1];
};
