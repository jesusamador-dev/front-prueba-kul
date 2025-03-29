'use client'

import { useState } from 'react'
import { CreateTransactionUseCase } from '@/app/transactions/application/use-cases/CreateTransactionUseCase'
import { FetchTransactionsGateway } from '@/app/transactions/infrastructure/gateways/FetchTransactionsGateway'
import { RSAEncryptor } from '@/shared/infrastructure/encryption/RSAEncryptor'
import { useKeyPairStore } from '@/shared/presentation/state/useKeyPairState'
import { TransactionCreateRequest } from '../../domain/entities/TransactionCreateRequest'

export const useFetchCreateTransaction = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const keyPair = useKeyPairStore(state => state.keyPair);

  const createTransaction = async (transactionData: TransactionCreateRequest) => {
    if (!keyPair) {
      setError("No hay llave pública disponible")
      return
    }

    setLoading(true)
    setError(null)

    const gateway = new FetchTransactionsGateway()
    const encryptor = new RSAEncryptor(keyPair.public_key)
    const useCase = new CreateTransactionUseCase(gateway, encryptor)

    try {
      await useCase.execute(transactionData);
      return true;
    } catch (err) {
      console.error("Error creating transaction:", err);
      setError("Error creando transacción");
      setLoading(false);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { createTransaction, loading, error }
}
