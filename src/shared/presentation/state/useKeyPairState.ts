import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { KeyPair } from '@/shared/domain/entities/KeyPair'

interface KeyPairState {
  keyPair: KeyPair | null
  setKeyPair: (keyPair: KeyPair) => void
  clearKeyPair: () => void
}

export const useKeyPairStore = create<KeyPairState>()(
  persist(
    (set) => ({
      keyPair: null,
      setKeyPair: (keyPair) => set({ keyPair }),
      clearKeyPair: () => set({ keyPair: null }),
    }),
    {
      name: 'key-pair-store',
      storage: createJSONStorage(() => indexedDBStorage('key-pair-store')),
    }
  )
)

function indexedDBStorage(name: string): Storage {
  return {
    getItem: async () => {
      const request = indexedDB.open(name, 1)
      return new Promise((resolve, reject) => {
        request.onupgradeneeded = () => {
          request.result.createObjectStore(name)
        }
        request.onsuccess = () => {
          const transaction = request.result.transaction(name, 'readonly')
          const store = transaction.objectStore(name)
          const req = store.get(name)
          req.onsuccess = () => resolve(req.result || null)
          req.onerror = () => reject(req.error)
        }
        request.onerror = () => reject(request.error)
      })
    },
    setItem: async (_, value) => {
      const request = indexedDB.open(name, 1)
      return new Promise((resolve, reject) => {
        request.onupgradeneeded = () => {
          request.result.createObjectStore(name)
        }
        request.onsuccess = () => {
          const transaction = request.result.transaction(name, 'readwrite')
          const store = transaction.objectStore(name)
          store.put(value, name)
          transaction.oncomplete = () => resolve()
          transaction.onerror = () => reject(transaction.error)
        }
        request.onerror = () => reject(request.error)
      })
    },
    removeItem: async () => {
      const request = indexedDB.open(name, 1)
      return new Promise((resolve, reject) => {
        request.onupgradeneeded = () => {
          request.result.createObjectStore(name)
        }
        request.onsuccess = () => {
          const transaction = request.result.transaction(name, 'readwrite')
          const store = transaction.objectStore(name)
          store.delete(name)
          transaction.oncomplete = () => resolve()
          transaction.onerror = () => reject(transaction.error)
        }
        request.onerror = () => reject(request.error)
      })
    },
  }
}
