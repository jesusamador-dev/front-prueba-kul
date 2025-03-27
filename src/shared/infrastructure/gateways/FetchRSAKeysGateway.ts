import { RSAKeysGateway } from '@/shared/domain/gateways/RSAKeysGateway';
import { KeyPairResponse } from '@/shared/domain/entities/KeyPairResponse';

export class FetchRSAKeysGateway implements RSAKeysGateway {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  }

  async get(): Promise<KeyPairResponse> {
    const response = await fetch(`${this.baseUrl}/keys/rsa/app_kul`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: KeyPairResponse = await response.json();
    return data;
  }
}