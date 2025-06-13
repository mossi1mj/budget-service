import { PlaidService } from "@/lib/openapi";
import useSWR from "swr";

export function usePlaidTransactions(idToken: string | null) {
  // Use SWR with a key dependent on idToken (skip if no token)
  const { data, error, isValidating } = useSWR(
    idToken ? "plaidTransactions" : null,
    () => PlaidService.getTransactionsPlaidTransactionsGet(idToken || "")
  );

  return {
    transactions: data,
    isLoading: isValidating && !error,
    isError: error,
  };
}
