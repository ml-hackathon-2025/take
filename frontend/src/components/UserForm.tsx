import { useState } from "react";
import { createUser } from "../services/userService";

export default function UserForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({ name, userRole: role });
      alert("User erstellt!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Rolle" value={role} onChange={e => setRole(e.target.value)} />
      <button type="submit">Speichern</button>
    </form>
  );
}