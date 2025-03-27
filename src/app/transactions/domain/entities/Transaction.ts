
export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  customer_name: string;
  customer_email: string;
  status: string;
  gateway_transaction_id: string;
  date: string;
}