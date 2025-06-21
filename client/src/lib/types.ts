export type Transaction = {
  transaction_id: string;
  date: string;
  name: string;
  amount: number;
  iso_currency_code: string;
  personal_finance_category?: {
    primary: string;
    detailed: string;
  };
  pending: boolean;
};
