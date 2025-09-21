import { useEffect, useState } from "react";
import { getDeviceTypes } from "../services/deviceTypeService.ts";

type DeviceType = {
  id: number;
  name: string;
  maxWindowDays: number;
  categoryId: number;
  total: number;
  available: number;
};

export default function DeviceTypeList() {
  const [types, setTypes] = useState<DeviceType[]>([]);

  useEffect(() => {
    getDeviceTypes().then(setTypes).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Gerätetypen</h2>
      <ul>
        {types.map(t => (
          <li key={t.id}>
            {t.name} – verfügbar: {t.available}/{t.total}
          </li>
        ))}
      </ul>
    </div>
  );
}