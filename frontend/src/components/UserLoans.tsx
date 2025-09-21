import { useEffect, useState } from "react";
import * as userService from "../services/userService";
import type { Loan } from "../services/userService";
import { useParams } from "react-router-dom";

export default function UserLoans() {
  const { id } = useParams();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    userService.getUserLoans(Number(id))
      .then((data) => setLoans(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Lade Ausleihen…</p>;
  if (error) return <p>Fehler: {error}</p>;

  return (
    <div>
      <h2>Ausleihen für User {id}</h2>
      {loans.length === 0 ? (
        <p>Keine aktiven oder vergangenen Ausleihen.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Gerät</th>
              <th>Ausgeliehen am</th>
              <th>Fällig am</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.deviceId}</td>
                <td>{new Date(loan.borrowedDate).toLocaleDateString()}</td>
                <td>{new Date(loan.dueDate).toLocaleDateString()}</td>
                <td>{loan.returned ? "Zurückgegeben" : "Aktiv"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}