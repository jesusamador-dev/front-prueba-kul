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

function indexedDBStorage(name: string) {
  return {
    getItem: async (key: string): Promise<string | null> => {
      const request = indexedDB.open(name, 1)
      return new Promise((resolve, reject) => {
        request.onupgradeneeded = () => {
          request.result.createObjectStore(name)
        }
        request.onsuccess = () => {
          const transaction = request.result.transaction(name, 'readonly')
          const store = transaction.objectStore(name)
          const req = store.get(key)
          req.onsuccess = () => resolve(req.result || null)
          req.onerror = () => reject(req.error)
        }
        request.onerror = () => reject(request.error)
      })
    },
    setItem: async (key: string, value: string): Promise<void> => {
      const request = indexedDB.open(name, 1)
      return new Promise((resolve, reject) => {
        request.onupgradeneeded = () => {
          request.result.createObjectStore(name)
        }
        request.onsuccess = () => {
          const transaction = request.result.transaction(name, 'readwrite')
          const store = transaction.objectStore(name)
          const req = store.put(value, key)
          req.onsuccess = () => resolve()
          req.onerror = () => reject(req.error)
        }
        request.onerror = () => reject(request.error)
      })
    },
    removeItem: async (key: string): Promise<void> => {
      const request = indexedDB.open(name, 1)
      return new Promise((resolve, reject) => {
        request.onupgradeneeded = () => {
          request.result.createObjectStore(name)
        }
        request.onsuccess = () => {
          const transaction = request.result.transaction(name, 'readwrite')
          const store = transaction.objectStore(name)
          const req = store.delete(key)
          req.onsuccess = () => resolve()
          req.onerror = () => reject(req.error)
        }
        request.onerror = () => reject(request.error)
      })
    },
  }
}
