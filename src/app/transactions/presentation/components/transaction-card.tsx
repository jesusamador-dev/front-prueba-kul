import { Transaction } from "@/app/transactions/domain/entities/Transaction"

interface TransactionCardProps {
  transaction: Transaction
}

export const TransactionCard = ({ transaction }: TransactionCardProps) => {
  return (
    <div className="flex items-center justify-between py-3 px-2">
      <div className="flex items-center gap-3">
        <div className="bg-green-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3V3zm5 4v10m4-10v10m4-10v10" />
            </svg>
        </div>
        <div>
          <h3 className="font-semibold text-sm text-gray-800">{transaction.customer_name}</h3>
          <p className="text-xs text-gray-400">{transaction.date}</p>
        </div>
      </div>

      <span className={`text-sm font-semibold ${transaction.amount < 0 ? 'text-gray-700' : 'text-green-600'}`}>
        {transaction.amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
      </span>
    </div>
  )
}

