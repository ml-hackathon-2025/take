import { getDeviceById } from "../services/deviceService";
import { useEffect, useState } from "react";
import * as userService from "../services/userService";
import type { Loan } from "../services/userService";
import { useParams } from "react-router-dom";

type LoanWithDeviceName = Loan & { deviceName: string };

export default function UserLoans() {
  const { id } = useParams();
  const [loans, setLoans] = useState<LoanWithDeviceName[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    userService.getUserLoans(Number(id))
      .then(async (data) => {
        const loansWithNames = await Promise.all(
          data.map(async (loan) => {
            try {
              const device = await getDeviceById(loan.deviceId);
              return { ...loan, deviceName: device.name };
            } catch (err) {
              return { ...loan, deviceName: `Gerät #${loan.deviceId}` };
            }
          })
        );
        setLoans(loansWithNames as LoanWithDeviceName[]);
      })
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
                <td>{loan.deviceName}</td>
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