import axiosInstance from "./axios.config";
import { ICategory } from "../types/category.type";

export async function getAllCategories(): Promise<ICategory[]> {
  try {
    const response = await axiosInstance.get("/api/category");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function findCategoryById(id: string): Promise<ICategory> {
  try {
    const response = await axiosInstance.get(`/api/category/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    throw error;
  }
}

export async function createCategory(
  categoryData: ICategory
): Promise<ICategory> {
  try {
    const response = await axiosInstance.post("/api/category", categoryData);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

export async function updateCategory(
  id: string,
  updatedData: ICategory
): Promise<ICategory> {
  try {
    const response = await axiosInstance.put(
      `/api/category/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
}

export async function deleteCategory(id: number): Promise<{ message: string }> {
  try {
    const response = await axiosInstance.delete(`/api/category/${id}`);
    return response.data; // Assuming the API returns a message object
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}
