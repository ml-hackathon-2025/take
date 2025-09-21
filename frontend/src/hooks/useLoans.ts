import { useQuery } from "@tanstack/react-query";
import { getLoans, type Loan } from "../services/loanService";

export function useLoans(status: "active" | "overdue" | "all" = "active") {
    return useQuery<Loan[]>({
        queryKey: ["loans", status],
        queryFn: () => getLoans(status),
    });
}