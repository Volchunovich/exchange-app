import React from 'react';
import { Button } from '@material-ui/core';
import { BalanceCurrency } from '../Balance.types';
import { useBalanceItemStyles } from './BalanceItem.styles';

interface Props {
  currency: BalanceCurrency;
  balance: number;
}

const currencies = {
  [BalanceCurrency.USD]: '$',
  [BalanceCurrency.EUR]: '€',
};

const BalanceItem = ({ balance, currency }: Props) => {
  const classes = useBalanceItemStyles();

  return (
    <div className={classes.mainContainer}>
      <div className={classes.subContainer}>
        <div>
          {currencies[currency]} ({currency.toUpperCase()}) -{' '}
          {balance.toFixed(6)}
        </div>

        <div className={classes.buttons}>
          <Button color='primary' variant='contained'>
            Deposit
          </Button>
          <Button color='primary' variant='contained'>
            Withdraw
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BalanceItem;
