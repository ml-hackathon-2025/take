import { useQuery } from "@tanstack/react-query";
import type { Loan } from "../types";

export function useLoans(status: "active" | "overdue" | "all" = "active") {
    return useQuery<Loan[]>({
        queryKey: ["loans", status],
        queryFn: () =>
            fetch(`/api/loans?status=${status}`).then(r => {
                if (!r.ok) throw new Error("Failed to load loans");
                return r.json();
            }),
    });
}