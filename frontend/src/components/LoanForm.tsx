import { useState } from "react";
import { borrowDevice } from "../services/loanService";

export default function LoanForm() {
  const [deviceId, setDeviceId] = useState("");
  const [userId, setUserId] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await borrowDevice({ deviceId: Number(deviceId), userId: Number(userId), dueDate });
      alert("Gerät ausgeliehen!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Device ID" value={deviceId} onChange={e => setDeviceId(e.target.value)} />
      <input placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <button type="submit">Ausleihen</button>
    </form>
  );
}