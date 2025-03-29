import { Transaction } from "./Transaction"


export interface TransactionDetailResponse {
  requestId: string
  success: boolean
  data: Transaction
}