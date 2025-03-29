"use client";

import { TransactionDetails } from "./presentation/components/transaction-details";
import { TransactionSidebar } from "./presentation/components/transaction-sidebar";
import { useFetchKeyPair } from '@/shared/presentation/hooks/useFetchKeysPair'

export default function TransactionPage() {
  useFetchKeyPair();
  return (
    <>
      <TransactionSidebar></TransactionSidebar>
      <main className="p-4 sm:ml-64 bg-gray-50 h-screen flex align-items-center justify-content-center">
          <TransactionDetails></TransactionDetails>
      </main>
    </>
  );
}