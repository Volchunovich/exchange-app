export type AmountCurrencyType = 'USD' | 'EUR';
export type CryptoCurrencyType = 'BTC';

export interface CurrencyType {
  label: string;
  value: string;
}

export interface ExchangeState {
  currency: string;
  amount: string;
  cryptoAmount: string;
  firstOrder: 0 | 1;
  secondOrder: 0 | 1;
  amountCurrency: AmountCurrencyType;
  cryptoCurrency: CryptoCurrencyType;
  cryptoWallet: string;
}
