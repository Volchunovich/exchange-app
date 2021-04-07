import React, { useState } from 'react';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';

import ImportExportIcon from '@material-ui/icons/ImportExport';
import { ExchangeState } from './Exchange.types';
import { amountCurrencies, cryptoCurrencies } from './Exchange.consts';
import { useExchangeStyles } from './Exchange.styles';
import {
  getAmountCurrencyLabelByValue,
  getCryptoCurrencyLabelByValue,
} from './Exchange.utils';
import { ExchangeRow } from './ExchangeRow/ExchangeRow';
import { FormattedMessage } from 'react-intl';

const Exchange = () => {
  const classes = useExchangeStyles();
  const [values, setValues] = useState<ExchangeState>({
    currency: '',
    amount: '',
    cryptoAmount: '',
    firstOrder: 0,
    secondOrder: 1,
    amountCurrency: 'EUR',
    cryptoCurrency: 'BTC',
    cryptoWallet: '',
  });

  const handleChange = (prop: keyof ExchangeState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSwitchButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (values.firstOrder) {
      setValues({ ...values, firstOrder: 0, secondOrder: 1 });
    } else {
      setValues({ ...values, firstOrder: 1, secondOrder: 0 });
    }
  };

  const containers = [
    <ExchangeRow
      value={values.amount}
      currency={values.amountCurrency}
      currencyLabel={getAmountCurrencyLabelByValue(values.amountCurrency)}
      currencies={amountCurrencies}
      handleAmountChange={handleChange('amount')}
      handleSelectChange={handleChange('amountCurrency')}
    />,
    <ExchangeRow
      value={values.cryptoAmount}
      currency={values.cryptoCurrency}
      currencyLabel={getCryptoCurrencyLabelByValue(values.cryptoCurrency)}
      currencies={cryptoCurrencies}
      handleAmountChange={handleChange('cryptoAmount')}
      handleSelectChange={handleChange('cryptoCurrency')}
    />,
  ];

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <div>
          <FormattedMessage
            id='youHave'
            defaultMessage='You have:'
            description='you have:'
          />
        </div>
        {containers[values.firstOrder]}

        <Button onClick={handleSwitchButton}>
          <ImportExportIcon />
        </Button>

        <div>
          <FormattedMessage
            id='youGet'
            defaultMessage='You get:'
            description='you get:'
          />
        </div>
        {containers[values.secondOrder]}

        <FormControl fullWidth variant='outlined'>
          <InputLabel htmlFor='outlined-adornment-amount'>
            <FormattedMessage
              id='wallet'
              defaultMessage='Wallet'
              description='wallet'
            />
          </InputLabel>
          <OutlinedInput
            value={values.cryptoWallet}
            onChange={handleChange('cryptoWallet')}
            labelWidth={60}
          />
        </FormControl>

        <Button color='primary' variant='contained'>
          <FormattedMessage
            id='exchange'
            defaultMessage='Exchange'
            description='exchange'
          />
        </Button>
      </Container>
    </div>
  );
};

export default Exchange;
