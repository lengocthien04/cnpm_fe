export interface FileUploadResponse {
  message: string
  file: {
    name: string;
    mimeType: string;
    total_pages: string;
    path: string;
    id: string;
  }
}
