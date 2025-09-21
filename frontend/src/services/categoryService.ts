import httpInstance from "./httpInstance";

// Based on OpenAPI CategoryDTO
export type Category = {
  id: number; // int64 in API
  name: string;
};

export type CategoryPayload = {
  name: string;
};

export async function getCategories(): Promise<Category[]> {
  const response = await httpInstance.get<Category[]>("/api/categories");
  return response.data;
}

export async function getCategoryById(id: number): Promise<Category> {
  const response = await httpInstance.get<Category>(`/api/categories/${id}`);
  return response.data;
}

export async function createCategory(category: CategoryPayload): Promise<Category> {
  const response = await httpInstance.post<Category>("/api/categories", category);
  return response.data;
}