import { Transaction } from "@/app/transactions/domain/entities/Transaction";
import { useTransactionStore } from '@/app/transactions/presentation/state/useTransactionStore';
import { useFetchTransactions } from '@/app/transactions/presentation/hooks/useFetechTransactions';
import { TransactionCard } from "./transaction-card";


export function TransactionSidebar() {
  useFetchTransactions()
  const transactions: Transaction[] = useTransactionStore(state => state.transactions)

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {transactions.map(tx => (
            <li key={tx.id}>
              <TransactionCard transaction={tx}></TransactionCard>
            </li>
          ))}
          </ul>
      </div>
    </aside>
  )
}
