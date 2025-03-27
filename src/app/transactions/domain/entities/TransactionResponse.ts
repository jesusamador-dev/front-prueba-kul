

export interface TransactionResponse {
  requestId: string
  success: boolean
  data: {
    id: string;
    amount: string;
    currency: string;
    customer_name: string;
    customer_email: string;
    status: string;
    gateway_transaction_id: string;
    date: string;
  }[]
}