import axiosInstance from "./axios.config";
import { IFileUploadResponse, IFileListResponse } from "../types/media.type"; // Ensure to define these types

// uploadFile
export async function uploadFile(
  fileData: FormData
): Promise<IFileUploadResponse> {
  try {
    const response = await axiosInstance.post("/api/media/upload", fileData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

// getList
export async function getFileList(): Promise<IFileListResponse[]> {
  try {
    const response = await axiosInstance.get("/api/media");
    return response.data;
  } catch (error) {
    console.error("Error fetching file list:", error);
    throw error;
  }
}

// removeFile
export async function deleteFile(id: number): Promise<IFileUploadResponse> {
  try {
    const response = await axiosInstance.delete(`/api/media/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}

// removeFileList
export async function deleteFileList(
  ids: string[]
): Promise<IFileUploadResponse> {
  try {
    const response = await axiosInstance.delete(`/api/media`, {
      data: { ids }, // assuming your backend expects an object with an 'ids' property
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting multiple files:", error);
    throw error;
  }
}
