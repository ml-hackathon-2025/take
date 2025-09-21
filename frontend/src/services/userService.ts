export type User = {
  id: number;
  name: string;
  userRole: string;
  createdAt: string;
  updatedAt: string;
};

export type UserPayload = {
  name: string;
  userRole: string;
};

export type Loan = {
  id: number;
  deviceId: number;
  userId: number;
  borrowedDate: string;
  dueDate: string;
  returned: boolean;
};

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

export async function getUsers(): Promise<User[]> {
  const res = await fetch("/api/users");
  return handleResponse<User[]>(res);
}

export async function getUserById(id: number): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  return handleResponse<User>(res);
}

export async function createUser(user: UserPayload): Promise<User> {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return handleResponse<User>(res);
}

export async function getUserLoans(id: number): Promise<Loan[]> {
  const res = await fetch(`/api/users/${id}/loans`);
  return handleResponse<Loan[]>(res);
}