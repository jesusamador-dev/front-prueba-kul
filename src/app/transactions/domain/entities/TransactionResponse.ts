import { Transaction } from "./Transaction"


export interface TransactionResponse {
  requestId: string
  success: boolean
  data: Transaction[]
}