import { TransactionResponse } from "@/app/transactions/domain/entities/TransactionResponse";
import { TransactionCreateRequest } from "@/app/transactions/domain/entities/TransactionCreateRequest";

export interface TransactionsGateway {
  create(data: TransactionCreateRequest): Promise<TransactionResponse>;
  getAll(): Promise<TransactionResponse>;
  getById(id: string): Promise<TransactionResponse>;
}
