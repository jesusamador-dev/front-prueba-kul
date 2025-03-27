import JSEncrypt from "jsencrypt";

export class RSAEncryptor {
  private encryptor: JSEncrypt

  constructor(publicKey: string) {
    this.encryptor = new JSEncrypt()
    this.encryptor.setPublicKey(publicKey)
  }

  encrypt(value: string): string {
    const result = this.encryptor.encrypt(value)
    if (!result) throw new Error("No se pudo cifrar el valor")
    return result
  }
}
