import { Transaction } from "@/app/transactions/domain/entities/Transaction";
import { useTransactionStore } from '@/app/transactions/presentation/state/useTransactionStore';
import { useFetchTransactions } from '@/app/transactions/presentation/hooks/useFetechTransactions';
import { TransactionCard } from "./transaction-card";


export function TransactionSidebar() {
  useFetchTransactions()
  const transactions: Transaction[] = useTransactionStore(state => state.transactions)
  const setSelectedTransactionId = useTransactionStore(state => state.setSelectedTransactionId);
  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100">
        <ul className="space-y-2 font-medium">
          {transactions.map(tx => (
            <li key={tx.id}>
              <div onClick={() => setSelectedTransactionId(tx.id)} className="cursor-pointer">
                <TransactionCard transaction={tx}></TransactionCard>
              </div>
            </li>
          ))}
          </ul>
      </div>
    </aside>
  )
}
