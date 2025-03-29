'use client'

import { useEffect } from 'react';
import { GetByIdTransactionUseCase } from '@/app/transactions/application/use-cases/GetByIdTransactionUseCase';
import { FetchTransactionsGateway } from '@/app/transactions/infrastructure/gateways/FetchTransactionsGateway';
import { RSADecryptor } from '@/shared/infrastructure/encryption/RSADecryptor';
import { useTransactionStore } from '@/app/transactions/presentation/state/useTransactionStore';
import { useKeyPairStore } from '@/shared/presentation/state/useKeyPairState';

export const useFetchTransactionDetail = () => {
  const setTransaction = useTransactionStore(state => state.setTransaction);
  const selectedId = useTransactionStore(state => state.selectedTransactionId);
  const keyPair = useKeyPairStore(state => state.keyPair)

  useEffect(() => {
    if (!keyPair) return;
    if (!selectedId) return;
    const fetchTransactions = async () => {
      const gateway = new FetchTransactionsGateway();
      const decryptor = new RSADecryptor(keyPair.private_key);
      const useCase = new GetByIdTransactionUseCase(gateway, decryptor);

      try {
        const transaction = await useCase.execute(selectedId);
        setTransaction(transaction);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }

    fetchTransactions()
  }, [setTransaction, keyPair, selectedId])
}
