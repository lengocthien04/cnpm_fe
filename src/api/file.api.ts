import { FileModel } from "../types/file.type";
import http from "../utils/http";

const url = "/v1/file";

const fileApi = {
  uploadFile(data: { file: File }) {
    const body = {
      file: data.file,
    };
    return http.post<FileModel>(`${url}/upload`, body);
  },
};
export default fileApi;
