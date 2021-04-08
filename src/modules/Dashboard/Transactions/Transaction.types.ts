import { BalanceCurrency } from '../Balance/Balance.types';
export enum TransactionStatus {
  Pending = 'pending',
  Transfering = 'transfering',
  Declined = 'declined',
  Completed = 'completed'
}

export enum TransactionType {
  Deposit = 'deposit',
  Withdraw = 'withdraw',
}

export interface GenerateTransactionInDTO {
  id: string;
}

export interface GenerateTransactionOutDTO {
  amount: number;
  type: TransactionType;
}

export interface GetTransactionOutDTO {
  transactionId: string;
}

export interface GetTransactionInDTO {
  amount: number;
  currency: BalanceCurrency;
  type: TransactionType;
  createdDate: number;
  expiredDate: number;
  email: string;
  status: TransactionStatus;
}