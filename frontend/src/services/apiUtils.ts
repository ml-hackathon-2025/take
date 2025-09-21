import httpInstance from "./httpInstance";

/**
 * Generic API service functions
 */
export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getAll<T>(): Promise<T[]> {
    const response = await httpInstance.get<T[]>(this.baseUrl);
    return response.data;
  }

  async getById<T>(id: number | string): Promise<T> {
    const response = await httpInstance.get<T>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async create<T, P = Partial<T>>(payload: P): Promise<T> {
    const response = await httpInstance.post<T>(this.baseUrl, payload);
    return response.data;
  }

  async update<T, P = Partial<T>>(id: number | string, payload: P): Promise<T> {
    const response = await httpInstance.patch<T>(`${this.baseUrl}/${id}`, payload);
    return response.data;
  }

  async delete(id: number | string): Promise<void> {
    await httpInstance.delete(`${this.baseUrl}/${id}`);
  }

  async replace<T, P = T>(id: number | string, payload: P): Promise<T> {
    const response = await httpInstance.put<T>(`${this.baseUrl}/${id}`, payload);
    return response.data;
  }
}

/**
 * Helper function for handling file uploads
 */
export async function uploadFile(
  endpoint: string,
  file: File,
  additionalData?: Record<string, any>
): Promise<any> {
  const formData = new FormData();
  formData.append('file', file);
  
  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, JSON.stringify(value));
    });
  }

  const response = await httpInstance.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
}

/**
 * Helper function for handling query parameters
 */
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, String(item)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Helper for paginated requests
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export async function getPaginated<T>(
  endpoint: string,
  params: PaginationParams = {}
): Promise<PaginatedResponse<T>> {
  const queryString = buildQueryString(params);
  const response = await httpInstance.get<PaginatedResponse<T>>(`${endpoint}${queryString}`);
  return response.data;
}