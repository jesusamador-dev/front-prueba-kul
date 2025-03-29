import { TransactionsGateway } from "@/app/transactions/domain/gateways/TransactionsGateway";
import { TransactionResponse } from "@/app/transactions/domain/entities/TransactionResponse";
import { Transaction } from "@/app/transactions/domain/entities/Transaction";
import { RSADecryptor } from "@/shared/infrastructure/encryption/RSADecryptor";

export class GetAllTransactionsUseCase {
  constructor(
    private readonly gateway: TransactionsGateway,
    private readonly decryptor: RSADecryptor
  ) { }

  async execute(): Promise<Transaction[]> {
    const encrypted: TransactionResponse = await this.gateway.getAll()

    return encrypted.data.map((tx) => ({
      id: tx.id,
      amount: Number(this.decryptor.decrypt(tx.amount.toString())),
      currency: this.decryptor.decrypt(tx.currency),
      customer_name: this.decryptor.decrypt(tx.customer_name),
      customer_email: this.decryptor.decrypt(tx.customer_email),
      status: this.decryptor.decrypt(tx.status),
      gateway_transaction_id: this.decryptor.decrypt(tx.gateway_transaction_id),
      date: tx.date,
    }))
  }
}
