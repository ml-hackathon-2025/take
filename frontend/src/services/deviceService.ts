import httpInstance from "./httpInstance";
import type { ID } from "../types";

// Based on OpenAPI StockItemDTO
export type StockItem = {
  id: number; // int64 in API
  sku: string;
  deviceId: number; // int32 in API  
  userId?: string; // Optional, present when borrowed
  available?: boolean; // Computed field for UI
  device?: DeviceType; // Populated by joins
  user?: User; // Populated when borrowed
  borrowedDate?: string;
  dueDate?: string;
};

// Based on OpenAPI DeviceDTO
export type DeviceType = {
  id: number; // int32 in API
  name: string;
  maxWindowDays: number;
  description?: string;
  brand?: string; // Not in API spec but might be added
};

// Based on OpenAPI UserDTO
export type User = {
  id: string;
  username: string;
  userRole: 'ADMIN' | 'USER';
  createdAt: string;
  updatedAt: string;
};

export type StockItemPayload = {
  sku: string;
  deviceId: number;
  userId?: string;
};

export type StockItemUpdate = Partial<Pick<StockItem, "sku" | "deviceId" | "userId">>;

// Get all stock items (individual devices)
export async function getDevices(): Promise<StockItem[]> {
  const response = await httpInstance.get<StockItem[]>("/api/devices");
  return response.data;
}

// Get specific stock item by ID
export async function getDeviceById(id: ID): Promise<StockItem> {
  const response = await httpInstance.get<StockItem>(`/api/devices/${id}`);
  return response.data;
}

// Create new stock item
export async function createDevice(device: StockItemPayload): Promise<StockItem> {
  const response = await httpInstance.post<StockItem>("/api/devices", device);
  return response.data;
}

// Update stock item
export async function updateDevice(id: ID, update: StockItemUpdate): Promise<StockItem> {
  const response = await httpInstance.patch<StockItem>(`/api/devices/${id}`, update);
  return response.data;
}

// Get all device types
export async function getDeviceTypes(): Promise<DeviceType[]> {
  const response = await httpInstance.get<DeviceType[]>("/api/device-type");
  return response.data;
}

// Get specific device type by ID
export async function getDeviceTypeById(id: ID): Promise<DeviceType> {
  const response = await httpInstance.get<DeviceType>(`/api/device-type/${id}`);
  return response.data;
}

// Create new device type
export async function createDeviceType(type: Omit<DeviceType, 'id'>): Promise<DeviceType> {
  const response = await httpInstance.post<DeviceType>("/api/device-type", type);
  return response.data;
}