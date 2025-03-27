'use client'

import { useEffect } from 'react'
import { GetKeysPairUseCase } from '@/shared/application/use-cases/GetKeysPair'
import { FetchRSAKeysGateway } from '@/shared/infrastructure/gateways/FetchRSAKeysGateway'
import { useKeyPairStore } from '@/shared/presentation/state/useKeyPairState'

export const useFetchKeyPair = () => {
  const setKeyPair = useKeyPairStore(state => state.setKeyPair)

  useEffect(() => {
    const fetchKeyPair = async () => {
      const gateway = new FetchRSAKeysGateway()
      const useCase = new GetKeysPairUseCase(gateway)

      try {
        const keyPair = await useCase.execute()
        setKeyPair(keyPair)
      } catch (error) {
        console.error("Error fetching key pair:", error)
      }
    }

    fetchKeyPair()
  }, [setKeyPair])
}
