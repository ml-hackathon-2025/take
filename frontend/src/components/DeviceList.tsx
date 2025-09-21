import { useEffect, useState } from "react";
import { getDevices } from "../services/deviceService";

type Device = {
  id: number;
  name: string;
  brand: string;
  available: boolean;
};

export default function DeviceList() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    getDevices().then(setDevices).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Geräte</h2>
      <ul>
        {devices.map(d => (
          <li key={d.id}>
            {d.name} ({d.brand}) – {d.available ? "frei" : "ausgeliehen"}
          </li>
        ))}
      </ul>
    </div>
  );
}