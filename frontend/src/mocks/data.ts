import type { Category, Device, DeviceType, ID, Loan, User } from "../types";

export const categories: Category[] = [
    { id: 1, name: "Power Tools" },
    { id: 2, name: "Safety" },
    { id: 3, name: "Measuring" },
];

export const deviceTypes: DeviceType[] = [
    { id: 10, name: "Cordless Drill", maxWindowDays: 14, categoryId: 1 },
    { id: 11, name: "Angle Grinder", maxWindowDays: 7, categoryId: 1 },
    { id: 20, name: "Hard Hat", maxWindowDays: 90, categoryId: 2 },
    { id: 30, name: "Laser Level", maxWindowDays: 10, categoryId: 3 },
];

export const users: User[] = [
    { id: 100, name: "Alice Foreman", userRole: "ADMIN" },
    { id: 101, name: "Bob Carpenter", userRole: "WORKER" },
    { id: 102, name: "Carla Mason", userRole: "WORKER" },
];

export const devices: Device[] = [
    { id: 1000, name: "Makita XFD12", brand: "Makita", available: true, deviceTypeId: 10 },
    {
        id: 1001, name: "DeWalt DCD791", brand: "DeWalt", available: false, deviceTypeId: 10,
        borrowedDate: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
        dueDate: new Date(Date.now() + 5 * 86400000).toISOString(), // in 5 days
        userId: 101
    },
    { id: 1002, name: "Bosch GWS 7-115", brand: "Bosch", available: true, deviceTypeId: 11 },
    { id: 2000, name: "Uvex Pheos", brand: "Uvex", available: true, deviceTypeId: 20 },
    {
        id: 3000, name: "Bosch GLL 3-80", brand: "Bosch", available: false, deviceTypeId: 30,
        borrowedDate: new Date(Date.now() - 12 * 86400000).toISOString(), // 12 days ago
        dueDate: new Date(Date.now() - 1 * 86400000).toISOString(),  // yesterday (overdue)
        userId: 102
    },
];

// Helpers
export function findDeviceType(id: ID) {
    const dt = deviceTypes.find(d => String(d.id) === String(id));
    if (!dt) throw new Error("DeviceType not found");
    return dt;
}
export function findUser(id: ID) {
    const u = users.find(u => String(u.id) === String(id));
    if (!u) throw new Error("User not found");
    return u;
}
export function findDevice(id: ID) {
    const d = devices.find(d => String(d.id) === String(id));
    if (!d) throw new Error("Device not found");
    return d;
}

export function listActiveLoans(): Loan[] {
    return devices
        .filter(d => !d.available && d.userId && d.dueDate && d.borrowedDate)
        .map(d => ({ deviceId: d.id, userId: d.userId!, borrowedDate: d.borrowedDate!, dueDate: d.dueDate! }));
}

export function deviceTypeAvailability() {
    // returns [{ id, name, maxWindowDays, categoryId, total, available }]
    return deviceTypes.map(dt => {
        const all = devices.filter(d => String(d.deviceTypeId) === String(dt.id));
        const available = all.filter(d => d.available).length;
        return { ...dt, total: all.length, available };
    });
}
