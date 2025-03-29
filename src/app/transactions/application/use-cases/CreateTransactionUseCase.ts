import type { TransactionsGateway } from '@/app/transactions/domain/gateways/TransactionsGateway'
import { RSAEncryptor } from '@/shared/infrastructure/encryption/RSAEncryptor'
import { TransactionCreateRequest } from '../../domain/entities/TransactionCreateRequest'
import { TransactionResponse } from '../../domain/entities/TransactionResponse'

export class CreateTransactionUseCase {
  constructor(
    private readonly gateway: TransactionsGateway,
    private readonly encryptor: RSAEncryptor
  ) { }

  async execute(transactionData: TransactionCreateRequest): Promise<TransactionResponse> {
    const encryptedData: TransactionCreateRequest = {
      amount: this.encryptor.encrypt(transactionData.amount.toString()),
      currency: this.encryptor.encrypt("MXN"),
      customer_information: {
        first_name: this.encryptor.encrypt(transactionData.customer_information.first_name),
        last_name: this.encryptor.encrypt(transactionData.customer_information.last_name),
        middle_name: transactionData.customer_information.middle_name
          ? this.encryptor.encrypt(transactionData.customer_information.middle_name)
          : '',
        email: this.encryptor.encrypt(transactionData.customer_information.email),
        phone: transactionData.customer_information.phone
          ? this.encryptor.encrypt(transactionData.customer_information.phone)
          : '',
        city: transactionData.customer_information.city
          ? this.encryptor.encrypt(transactionData.customer_information.city)
          : '',
        address: transactionData.customer_information.address
          ? this.encryptor.encrypt(transactionData.customer_information.address)
          : '',
        postal_code: transactionData.customer_information.postal_code
          ? this.encryptor.encrypt(transactionData.customer_information.postal_code)
          : '',
        state: transactionData.customer_information.state
          ? this.encryptor.encrypt(transactionData.customer_information.state)
          : '',
        country: this.encryptor.encrypt(transactionData.customer_information.country),
        ip: ''
      },
      card_information: {
        card_number: this.encryptor.encrypt(transactionData.card_information.card_number),
        cvv: this.encryptor.encrypt(transactionData.card_information.cvv),
        card_holder_name: this.encryptor.encrypt(transactionData.card_information.card_holder_name),
        expiration_year: this.encryptor.encrypt(transactionData.card_information.expiration_year),
        expiration_month: this.encryptor.encrypt(transactionData.card_information.expiration_month)
      }
    }

    const createdTransaction = await this.gateway.create(encryptedData)

    return createdTransaction
  }
}
