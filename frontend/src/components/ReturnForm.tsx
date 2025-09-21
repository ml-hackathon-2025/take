import { useState } from "react";
import { returnDevice } from "../services/loanService";

export default function ReturnForm() {
  const [deviceId, setDeviceId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await returnDevice({ deviceId: Number(deviceId) });
      alert("Gerät wurde zurückgegeben!");
      setDeviceId("");
    } catch (err) {
      console.error(err);
      alert("Fehler beim Zurückgeben des Geräts");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Gerät zurückgeben</h3>
      <input
        placeholder="Device ID"
        value={deviceId}
        onChange={(e) => setDeviceId(e.target.value)}
      />
      <button type="submit">Zurückgeben</button>
    </form>
  );
}