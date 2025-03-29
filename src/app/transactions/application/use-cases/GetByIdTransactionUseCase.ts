import { TransactionsGateway } from "@/app/transactions/domain/gateways/TransactionsGateway";
import { TransactionDetailResponse } from "@/app/transactions/domain/entities/TransactionDetailResponse";
import { Transaction } from "@/app/transactions/domain/entities/Transaction";
import { RSADecryptor } from "@/shared/infrastructure/encryption/RSADecryptor";

export class GetByIdTransactionUseCase {
  constructor(
    private readonly gateway: TransactionsGateway,
    private readonly decryptor: RSADecryptor
  ) { }

  async execute(id: string): Promise<Transaction> {
    const { data }: TransactionDetailResponse = await this.gateway.getById(id);
    const tx = data;
    return {
      id: tx.id,
      amount: Number(this.decryptor.decrypt(tx.amount.toString())),
      currency: this.decryptor.decrypt(tx.currency),
      customer_name: this.decryptor.decrypt(tx.customer_name),
      customer_email: this.decryptor.decrypt(tx.customer_email),
      status: this.decryptor.decrypt(tx.status),
      gateway_transaction_id: this.decryptor.decrypt(tx.gateway_transaction_id),
      date: tx.date,
    };
  }
}