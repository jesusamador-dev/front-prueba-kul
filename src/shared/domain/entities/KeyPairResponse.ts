export interface KeyPairResponse {
  requestId: string
  success: boolean
  data: {
    public_key: string,
    private_key: string
  }
}