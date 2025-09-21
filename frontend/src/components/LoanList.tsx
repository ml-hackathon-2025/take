import { useEffect, useState } from "react";
import { getLoans } from "../services/loanService";

type Loan = {
  id: number;
  deviceId: number;
  userId: number;
  dueDate: string;
};

export default function LoanList() {
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    getLoans("active").then(setLoans).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Aktive Ausleihen</h2>
      <ul>
        {loans.map(l => (
          <li key={l.id}>
            Device {l.deviceId} von User {l.userId} bis {l.dueDate}
          </li>
        ))}
      </ul>
    </div>
  );
}