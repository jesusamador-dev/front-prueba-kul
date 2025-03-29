import { Transaction } from "@/app/transactions/domain/entities/Transaction";
import { useTransactionStore } from "../state/useTransactionStore";
import { useFetchTransactionDetail } from "../hooks/useFetechTransactionDetail";

export const TransactionDetails = () => {
  useFetchTransactionDetail();
  const transaction: Transaction | null = useTransactionStore(state => state.transaction);

  if (!transaction) {
    return (
      <>
        No hay info
      </>
    );
  }


  return (
    <div className="bg-white rounded-3xl h-fit shadow-lg px-6 py-8 w-full max-w-xs mx-auto relative">
      <h2 className="text-gray-400 text-sm text-center">Monto</h2>
      <h1 className="text-3xl font-bold text-center my-2">
        {transaction.amount
          .toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
          .split('.')[0]}
        <span className="text-sm">
          .
          {
            transaction.amount
              .toFixed(2)
              .split('.')[1]
          }
        </span>
      </h1>

      <div className="border-t border-dashed border-gray-200 my-4"></div>

      <div className="text-sm">
        <h3 className="font-semibold mb-3">Detalle de transacción</h3>
        <div className="flex justify-between text-gray-500 mb-1">
          <span>Monto</span>
          <span>{
            transaction.amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
          }</span>
        </div>
        <div className="flex justify-between text-gray-500 mb-1">
          <span>Nombre</span>
          <span>{ transaction.customer_name }</span>
        </div>
        <div className="flex justify-between text-gray-500 mb-1">
          <span>Moneda</span>
          <span>{ transaction.currency }</span>
        </div>
        <div className="flex justify-between text-gray-500 mb-1">
          <span>Fecha</span>
          <span>{ transaction.date }</span>
        </div>
        <div className="flex justify-between text-gray-500 mb-1">
          <span>Blumonpay</span>
          <span>{ transaction.gateway_transaction_id }</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{
            transaction.amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
          }</span>
        </div>
      </div>

      <div className="border-t border-dashed border-gray-200 my-4"></div>

      <div className="bg-gray-100 rounded-xl p-3 text-xs text-gray-500 text-center gap-2">
        <p className="mb-2">
          { transaction.id }
        </p>
        <p>
          { transaction.customer_email }
        </p>
      </div>
    </div>
  )
}

