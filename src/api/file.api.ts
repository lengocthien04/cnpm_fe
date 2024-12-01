import { FileModel } from "../types/file.type";
import http from "../utils/http";

const url = "/v1/file";

const fileApi = {
  uploadFile(body: { file: File }) {
    console.log(body);
    return http.post<FileModel>(`${url}/upload`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
export default fileApi;
