import { InBalanceDTO, BalanceCurrency } from './Balance.types';

export class BalanceModel {
  currency: BalanceCurrency;
  balance: number;

  constructor(dto: InBalanceDTO) {
    this.currency = dto.currency;
    this.balance = dto.balance;
  }
}