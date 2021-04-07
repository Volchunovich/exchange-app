export enum BalanceCurrency {
  Euro = 'euro',
  Dollar = 'dollar',
}

export interface InBalanceDTO {
  currency: BalanceCurrency;
  balance: number;
}