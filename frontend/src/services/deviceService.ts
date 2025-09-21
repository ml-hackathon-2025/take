type Device = {
  id: number;
  name: string;
  brand: string;
  available: boolean;
  borrowedDate?: string;
  dueDate?: string;
  qrLink?: string;
  deviceTypeId?: number;
  userId?: number;
};

type DevicePayload = {
  name: string;
  brand: string;
  deviceTypeId: number;
  qrLink?: string;
};

type DeviceUpdate = Partial<Pick<Device, "name" | "brand" | "qrLink">>;

export async function getDevices(): Promise<Device[]> {
  const res = await fetch("/api/devices");
  return res.json();
}

export async function getDeviceById(id: number): Promise<Device> {
  const res = await fetch(`/api/devices/${id}`);
  return res.json();
}

export async function createDevice(device: DevicePayload): Promise<Device> {
  const res = await fetch("/api/devices", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(device),
  });
  return res.json();
}

export async function updateDevice(id: number, update: DeviceUpdate): Promise<Device> {
  const res = await fetch(`/api/devices/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
  return res.json();
}