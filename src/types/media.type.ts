// media.type.ts
export interface IFileUploadResponse {
  message: string;
  file: {
    id: string;
    url: string;
    filename: string;
    size: number;
    mimeType: string;
  };
}

export interface IFileListResponse {
  id: string;
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  createdAt: Date;
}
