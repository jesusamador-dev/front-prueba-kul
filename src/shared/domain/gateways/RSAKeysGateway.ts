import { KeyPairResponse } from "../entities/KeyPairResponse";

export interface RSAKeysGateway {
  get(): Promise<KeyPairResponse>;
}
