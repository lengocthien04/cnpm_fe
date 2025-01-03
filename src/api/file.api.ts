import { FileUploadResponse } from "../types/file.type";
import http from "../utils/http";

const url = "/v1/file";

const fileApi = {
  uploadFile(body: { file: File }) {
    return http.post<FileUploadResponse>(`${url}/upload`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
export default fileApi;
