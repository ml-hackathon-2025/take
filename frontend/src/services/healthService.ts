import httpInstance from "./httpInstance";

export async function healthCheck(): Promise<string> {
  const response = await httpInstance.get<string>("/api/health");
  return response.data;
}