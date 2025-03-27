"use client";

import { TransactionSidebar } from "./presentation/components/transaction-sidebar";
import { useFetchKeyPair } from '@/shared/presentation/hooks/useFetchKeysPair'

export default function TransactionPage() {
  useFetchKeyPair()
  return (
    <>
      <TransactionSidebar></TransactionSidebar>
      <main className="p-4 sm:ml-64">
          
      </main>
    </>
  );
}