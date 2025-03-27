import { RSAKeysGateway } from "@/shared/domain/gateways/RSAKeysGateway";
import { KeyPairResponse } from "@/shared/domain/entities/KeyPairResponse";
import { KeyPair } from "@/shared/domain/entities/KeyPair";

export class GetKeysPairUseCase {
  constructor(
    private readonly gateway: RSAKeysGateway
  ) { }

  async execute(): Promise<KeyPair> {
    const keys: KeyPairResponse = await this.gateway.get()

    return {
      private_key: keys.data.private_key,
      public_key: keys.data.public_key
    }
  }
}
