export type ID = string | number;

export interface Category { id: ID; name: string; }
export interface DeviceType {
    id: ID; name: string; maxWindowDays: number; categoryId: ID;
    total?: number; available?: number; // for "X of Y"
}
export interface User { id: ID; name: string; userRole: 'ADMIN' | 'WORKER'; createdAt?: string; updatedAt?: string; }

export interface Device {
    id: ID; name: string; brand?: string; available: boolean;
    borrowedDate?: string; dueDate?: string; qrLink?: string;
    deviceTypeId: ID; userId?: ID;
}

export interface Loan { deviceId: ID; userId: ID; borrowedDate: string; dueDate: string; }
