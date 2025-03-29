import { create } from 'zustand';
import { Transaction } from '@/app/transactions/domain/entities/Transaction';

interface TransactionStore {
  transactions: Transaction[];
  transaction: Transaction | null;
  selectedTransactionId: string | null;
  setTransactions: (txs: Transaction[]) => void;
  setTransaction: (tx: Transaction) => void;
  setSelectedTransactionId: (id: string) => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  transaction: null,
  selectedTransactionId: null,
  setTransactions: (txs) => set({ transactions: txs }),
  setTransaction: (tx) => set({ transaction: tx }),
  setSelectedTransactionId: (id) => set({ selectedTransactionId: id }),
}));
