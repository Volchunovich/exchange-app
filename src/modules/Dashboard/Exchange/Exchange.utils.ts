import { amountCurrencies, cryptoCurrencies } from "./Exchange.consts";
import { AmountCurrencyType, CryptoCurrencyType } from "./Exchange.types";

export const getAmountCurrencyLabelByValue = (value: AmountCurrencyType) =>
  amountCurrencies.find((currency) => currency.value === value)?.label;

export const getCryptoCurrencyLabelByValue = (value: CryptoCurrencyType) =>
  cryptoCurrencies.find((currency) => currency.value === value)?.label;