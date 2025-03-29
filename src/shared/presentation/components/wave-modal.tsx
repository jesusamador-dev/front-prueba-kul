'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface WaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function WaveModal({ isOpen, onClose, children }: WaveModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: '0%' }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 bg-transparent bg-opacity-10 backdrop-blur-sm flex justify-end z-50"
        >
          <div className="bg-white shadow-lg p-6 relative w-full max-w-md h-full overflow-auto">
            <button
              onClick={onClose}
              className="absolute cursor-pointer text-gray-800 top-0 left-0 bg-gray-100 px-3 py-1 text-xl font-bold"
            >
              ×
            </button>
            <div className='mt-5'>
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}