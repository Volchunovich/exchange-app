import { BalanceCurrency } from '../Balance/Balance.types';
import { GetTransactionInDTO, TransactionStatus, TransactionType } from './Transaction.types';

export class TransactionModel {
  id: string;
  amount!: number;
  currency!: BalanceCurrency;
  type!: TransactionType;
  createdDate!: Date;
  expiredDate!: Date;
  email!: string;
  status!: TransactionStatus;

  constructor(transactionId: string, dto: GetTransactionInDTO) {
    this.id = transactionId;
    this.amount = dto.amount; 
    this.currency = dto.currency;
    this.type = dto.type;
    this.createdDate = new Date(dto.createdDate);
    this.expiredDate = new Date(dto.expiredDate);
    this.email = dto.email;
    this.status = dto.status;
  }
}