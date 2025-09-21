type LoanPayload = {
  deviceId: number;
  userId: number;
  dueDate: string;
};

type ReturnPayload = {
  deviceId: number;
};

type Loan = {
  id: number;
  deviceId: number;
  userId: number;
  borrowedDate: string;
  dueDate: string;
  status: string;
};

export async function borrowDevice(payload: LoanPayload): Promise<Loan> {
  const res = await fetch("/api/loans/borrow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function returnDevice(payload: ReturnPayload): Promise<Loan> {
  const res = await fetch("/api/loans/return", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function getLoans(status?: string): Promise<Loan[]> {
  const url = status ? `/api/loans?status=${status}` : "/api/loans";
  const res = await fetch(url);
  return res.json();
}