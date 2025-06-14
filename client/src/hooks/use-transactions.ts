import { PlaidService } from "@/lib/openapi";
import useSWR from "swr";

export function usePlaidTransactions(token: string | null) {
  // Use SWR with a key dependent on idToken (skip if no token)
  const { data, error, isValidating } = useSWR(
    token ? "plaidTransactions" : null,
    () =>
      PlaidService.getTransactionsPlaidTransactionsGet(
        `Bearer ${token}`
      )
  );
  console.log(`Bearer ${token}`);
  console.log("Data:", data);
  return {
    transactions: data?.transactions || data,
    isLoading: isValidating && !error,
    isError: error,
  };
}
