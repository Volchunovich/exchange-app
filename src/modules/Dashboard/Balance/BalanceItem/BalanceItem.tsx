import React from 'react';
import { Button, makeStyles, Theme } from '@material-ui/core';
import { BalanceCurrency } from '../Balance.types';

export const useBalanceItemStyles = makeStyles((theme: Theme) => ({
  buttons: {
    '& .MuiButton-root': {
      margin: theme.spacing(1),
    },
  },
  mainContainer: {
    padding: '6px',
    borderBottom: '2px solid #3f51b5',
  },
  subContainer: {
    padding: '18px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

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
