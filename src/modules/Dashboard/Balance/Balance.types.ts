export enum BalanceCurrency {
  EUR = 'eur',
  USD = 'usd',
}

export enum BalanceOperation {
  Deposit = 'deposit',
  Withdraw = 'withdraw',
}

export interface InBalanceDTO {
  currency: BalanceCurrency;
  balance: number;
}