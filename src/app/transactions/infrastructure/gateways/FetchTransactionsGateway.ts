import { TransactionsGateway } from "@/app/transactions/domain/gateways/TransactionsGateway";
import { TransactionCreateRequest } from "@/app/transactions/domain/entities/TransactionCreateRequest";
import { TransactionResponse } from "@/app/transactions/domain/entities/TransactionResponse";

export class FetchTransactionsGateway implements TransactionsGateway {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  }

  async create(data: TransactionCreateRequest): Promise<TransactionResponse> {
    const res = await fetch(`${this.baseUrl}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: 'include'
    });

    if (!res.ok) throw new Error("Error al crear transacción");

    return await res.json();
  }

  async getAll(): Promise<TransactionResponse> {
    const res = await fetch(`${this.baseUrl}/transactions`, {
      credentials: 'include'
    });

    if (!res.ok) throw new Error("Error al obtener transacciones");

    return await res.json();
  }

  async getById(id: string): Promise<TransactionResponse> {
    const res = await fetch(`${this.baseUrl}/transactions/${id}`, {
      credentials: 'include'
    });

    if (!res.ok) throw new Error("Error al obtener transacción por id");

    return await res.json();
  }
}
