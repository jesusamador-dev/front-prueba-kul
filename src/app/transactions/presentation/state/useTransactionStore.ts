import { create } from "zustand"
import { Transaction } from "@/app/transactions/domain/entities/Transaction"

interface TransactionState {
  transactions: Transaction[]
  setTransactions: (txs: Transaction[]) => void
  clearTransactions: () => void
}

export const useTransactionStore = create<TransactionState>()((set) => ({
  transactions: [],
  setTransactions: (txs) => set({ transactions: txs }),
  clearTransactions: () => set({ transactions: [] }),
}))
