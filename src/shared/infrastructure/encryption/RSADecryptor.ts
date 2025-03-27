import JSEncrypt from "jsencrypt";

export class RSADecryptor {
  private decryptor: JSEncrypt

  constructor(privateKey: string) {
    this.decryptor = new JSEncrypt()
    this.decryptor.setPrivateKey(privateKey)
  }

  decrypt(value: string): string {
    const result = this.decryptor.decrypt(value)
    if (!result) throw new Error("No se pudo descifrar el valor")
    return result
  }
}
