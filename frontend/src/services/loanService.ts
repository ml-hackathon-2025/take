import httpInstance from "./httpInstance";
import { buildQueryString } from "./apiUtils";

// Based on OpenAPI LoanDTO
export type Loan = {
  id: number; // int32 in API
  stockItemId: number; // int64 in API - this is the actual device instance
  userId: string;
  borrowedDate: string; // date-time format
  dueDate: string; // date-time format
  returned: boolean;
};

// For borrow endpoint - uses query parameters according to OpenAPI
export async function borrowDevice(payload: { 
  deviceId: number; 
  userId: string; 
  dueDate: string 
}): Promise<Loan> {
  const queryString = buildQueryString({
    deviceId: payload.deviceId,
    userId: payload.userId,
    dueDate: payload.dueDate
  });
  
  const response = await httpInstance.post<Loan>(`/api/loans/borrow${queryString}`);
  return response.data;
}

// For return endpoint - uses query parameter according to OpenAPI
export async function returnDevice(payload: { deviceId: number }): Promise<Loan> {
  const queryString = buildQueryString({
    deviceId: payload.deviceId
  });
  
  const response = await httpInstance.post<Loan>(`/api/loans/return${queryString}`);
  return response.data;
}

// Get loans with optional status filter
export async function getLoans(status?: string): Promise<Loan[]> {
  const queryString = status ? buildQueryString({ status }) : '';
  const response = await httpInstance.get<Loan[]>(`/api/loans${queryString}`);
  return response.data;
}