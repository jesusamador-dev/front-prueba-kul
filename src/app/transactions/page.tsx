"use client";

import { useState } from "react";
import { TransactionDetails } from "./presentation/components/transaction-details";
import { TransactionSidebar } from "./presentation/components/transaction-sidebar";
import { useFetchKeyPair } from '@/shared/presentation/hooks/useFetchKeysPair'
import WaveModal from "@/shared/presentation/components/wave-modal";
import TransactionForm from "./presentation/components/transaction-form";

export default function TransactionPage() {
  useFetchKeyPair();
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <TransactionSidebar></TransactionSidebar>
      <main className="p-4 sm:ml-64 bg-gray-50 h-screen flex align-items-center justify-content-center">
        <TransactionDetails></TransactionDetails>
      </main>
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-6 cursor-pointer right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition">
        Hacer transacción
      </button>
      <WaveModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div>
          <h2 className="text-gray-600 text-xl font-bold">Nueva Transacción</h2>
          <TransactionForm></TransactionForm>
        </div>
      </WaveModal>
    </>
  );
}