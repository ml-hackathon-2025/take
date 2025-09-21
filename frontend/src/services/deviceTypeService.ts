type DeviceTypePayload = {
  name: string;
  maxWindowDays: number;
  categoryId: number;
};

export async function getDeviceTypes() {
    const res = await fetch("/api/device-types");
    return res.json();
  }
  
  export async function getDeviceTypeById(id: number) {
    const res = await fetch(`/api/device-types/${id}`);
    return res.json();
  }
  
  export async function createDeviceType(type: DeviceTypePayload) {
    const res = await fetch("/api/device-types", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(type),
    });
    return res.json();
  }