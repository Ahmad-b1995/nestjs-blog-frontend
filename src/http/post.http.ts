import axiosInstance from "./axios.config";
import { PostEndpoint, IPost } from "../types/post.type";

// findAll
export async function getAllPosts(): Promise<PostEndpoint> {
  try {
    const response = await axiosInstance.get("/api/posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

// findOne
export async function findPostById(id: number) {
  try {
    const response = await axiosInstance.get(`/api/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

// create
export async function createPost(postData: IPost) {
  try {
    const response = await axiosInstance.post("/api/posts", postData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

// update
export async function updatePost(id: number, updatedData: IPost) {
  try {
    const response = await axiosInstance.put(`/api/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

// remove
export async function deletePost(id: number) {
  try {
    const response = await axiosInstance.delete(`/api/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

// getPostsByTag
export async function findPostsByTag(tag: string[]) {
  try {
    const response = await axiosInstance.get(`/api/tags/${tag}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts by tag:", error);
    throw error;
  }
}

// getPostsByCategory
export async function findPostsByCategory(category: string[]) {
  try {
    const response = await axiosInstance.get(`/api/categories/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    throw error;
  }
}
