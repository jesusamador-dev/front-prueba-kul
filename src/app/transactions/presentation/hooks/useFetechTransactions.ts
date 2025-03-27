'use client'

import { useEffect } from 'react'
import { GetAllTransactionsUseCase } from '@/app/transactions/application/use-cases/GetAllTransactionsUseCase'
import { FetchTransactionsGateway } from '@/app/transactions/infrastructure/gateways/FetchTransactionsGateway'
import { RSADecryptor } from '@/shared/infrastructure/encryption/RSADecryptor'
import { useTransactionStore } from '@/app/transactions/presentation/state/useTransactionStore'
import { useKeyPairStore } from '@/shared/presentation/state/useKeyPairState'

export const useFetchTransactions = () => {
  const setTransactions = useTransactionStore(state => state.setTransactions)
  const keyPair = useKeyPairStore(state => state.keyPair)

  useEffect(() => {
    if (!keyPair) return;
    const fetchTransactions = async () => {
      const gateway = new FetchTransactionsGateway()
      const decryptor = new RSADecryptor(keyPair.private_key)
      const useCase = new GetAllTransactionsUseCase(gateway, decryptor)

      try {
        const transactions = await useCase.execute()
        setTransactions(transactions)
      } catch (error) {
        console.error("Error fetching transactions:", error)
      }
    }

    fetchTransactions()
  }, [setTransactions, keyPair])
}
