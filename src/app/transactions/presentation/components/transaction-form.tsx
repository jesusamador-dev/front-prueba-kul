'use client';

import { useForm } from 'react-hook-form';
import { useFetchCreateTransaction } from '../hooks/useFetchCreateTransaction';

interface TransactionFormValues {
  amount: string
  currency: string
  customer_information: {
    first_name: string
    last_name: string
    middle_name: string
    email: string
    phone: string
    city: string
    address: string
    postal_code: string
    state: string
    country: string
  }
  card_information: {
    card_number: string
    cvv: string
    card_holder_name: string
    expiration_year: string
    expiration_month: string
  }
}

export default function TransactionForm() {
  const { register, handleSubmit } = useForm<TransactionFormValues>();
  const { createTransaction, loading, error } = useFetchCreateTransaction();

  const onSubmit = async (data: TransactionFormValues) => {
    const success = await createTransaction(data);
    console.log(success)
    if (success) {
      window.location.href = "/transactions";
    }
  }

  return (
    <form className="p-6 rounded-xl max-w-lg mx-auto text-gray-600 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-lg font-semibold">Montos</h3>

      <div className="grid grid-cols-2 gap-4">
        <input className="col-span-1 px-3 py-2 rounded border border-gray-300" placeholder="Monto" {...register('amount')} required />
      </div>

      <h3 className="text-lg font-semibold">Información personal</h3>

      <div className="grid grid-cols-2 gap-4">
        <input className="px-3 py-2 rounded border border-gray-300" placeholder="Nombre(s)" {...register('customer_information.first_name')} required />
        <input className="px-3 py-2 rounded border border-gray-300" placeholder="Apellido paterno" {...register('customer_information.middle_name')} required />
        <input className="px-3 py-2 rounded border border-gray-300" placeholder="Apellido materno" {...register('customer_information.last_name')} />
        <input className="px-3 py-2 rounded border border-gray-300" placeholder="Correo electrónico" {...register('customer_information.email')} required type="email" />
        <input className="px-3 py-2 rounded border border-gray-300" placeholder="Celular" {...register('customer_information.phone')} />
        <input className="px-3 py-2 rounded border border-gray-300" placeholder="Ciudad" {...register('customer_information.city')} />
        <input className="px-3 py-2 rounded border border-gray-300 col-span-2" placeholder="Dirección" {...register('customer_information.address')} />
        <input className="px-3 py-2 rounded border border-gray-300" placeholder="Código postal" {...register('customer_information.postal_code')} />
        <input className="px-3 py-2 rounded border border-gray-300" placeholder="Estado" {...register('customer_information.state')} />
        <input className="px-3 py-2 rounded border border-gray-300" placeholder="País" {...register('customer_information.country')} required />
      </div>

      <h3 className="text-lg font-semibold">Información de la tarjeta</h3>

      <div className="grid grid-cols-2 gap-4">
        <input className="col-span-2 px-3 py-2 rounded border border-gray-300" placeholder="Nombre en la tarjeta" {...register('card_information.card_holder_name')} required />
        <input className="col-span-2 px-3 py-2 rounded border border-gray-300" placeholder="Número de tarjeta" {...register('card_information.card_number')} required />
        <input className="px-3 py-2 rounded border border-gray-300" placeholder="Mes (MM)" required {...register('card_information.expiration_month')}/>
        <input className="px-3 py-2 rounded border border-gray-300" placeholder="Año (YY)" required {...register('card_information.expiration_year')}/>
        <input className="px-3 py-2 rounded border border-gray-300 col-span-2" placeholder="CVV" required {...register('card_information.cvv')}/>
      </div>

      <div className="flex gap-2 pt-2">
        <button type="submit" disabled={loading} className="w-full cursor-pointer bg-gray-800 text-white px-4 py-2 rounded">
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>

      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
}