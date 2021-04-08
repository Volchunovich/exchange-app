export enum BalanceCurrency {
  EUR = 'eur',
  USD = 'usd',
}

export interface InBalanceDTO {
  currency: BalanceCurrency;
  balance: number;
}