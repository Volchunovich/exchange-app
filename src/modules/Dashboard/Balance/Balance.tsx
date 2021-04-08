import React, { useState, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { makeStyles, Theme } from '@material-ui/core';
import BalanceItem from './BalanceItem/BalanceItem';
import { BalanceStore } from './Balance.store';
import { useStore } from '../../../utils/ioc.util';

export const useBalanceStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

const Balance = () => {
  const classes = useBalanceStyles();
  const balanceStore = useStore(BalanceStore);
  const intl = useIntl();

  useEffect(() => {
    balanceStore.fetchBalances().catch(console.error);
  });

  return (
    <div className={classes.root}>
      <div>
        <FormattedMessage
          id='currentBalance'
          defaultMessage='Your current balance is'
        />
      </div>
      {balanceStore.balances.map((model) => (
        <BalanceItem balance={model.balance} currency={model.currency} />
      ))}
    </div>
  );
};

export default Balance;
