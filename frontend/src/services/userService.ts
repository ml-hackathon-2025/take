import httpInstance from "./httpInstance";
import type { Loan } from "./loanService";

// Based on OpenAPI UserDTO
export type User = {
  id: string;
  username: string;
  userRole: 'ADMIN' | 'USER';
  createdAt: string; // date-time format
  updatedAt: string; // date-time format
  devices?: any[]; // StockItem array but not used much in UI
};

export type UserPayload = {
  username: string;
  userRole: 'ADMIN' | 'USER';
};

export async function getUsers(): Promise<User[]> {
  const response = await httpInstance.get<User[]>("/api/users");
  return response.data;
}

export async function getUserById(id: string): Promise<User> {
  const response = await httpInstance.get<User>(`/api/users/${id}`);
  return response.data;
}

export async function createUser(user: UserPayload): Promise<User> {
  const response = await httpInstance.post<User>("/api/users", user);
  return response.data;
}

export async function getUserLoans(id: string): Promise<Loan[]> {
  const response = await httpInstance.get<Loan[]>(`/api/users/${id}/loans`);
  return response.data;
}