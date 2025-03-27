export interface TransactionCreateRequest {
  amount: string;
  currency: string;
  customer_information: Record<string, string>;
  card_information: Record<string, string>;
}
