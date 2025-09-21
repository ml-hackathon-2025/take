import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

type User = {
  id: number;
  name: string;
  userRole: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Benutzer</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name} – {u.userRole}
          </li>
        ))}
      </ul>
    </div>
  );
}