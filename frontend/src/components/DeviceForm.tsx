import { useState } from "react";
import { createDevice } from "../services/deviceService";

export default function DeviceForm() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDevice({ name, brand, deviceTypeId: 1 }); // DeviceTypeId vorerst fix
      alert("Gerät erstellt!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Marke" value={brand} onChange={e => setBrand(e.target.value)} />
      <button type="submit">Speichern</button>
    </form>
  );
}