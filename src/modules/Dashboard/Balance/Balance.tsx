import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { makeStyles, Theme } from '@material-ui/core';
import BalanceItem from './BalanceItem/BalanceItem';
import { BalanceStore } from './Balance.store';
import { useStore } from '../../../utils/ioc.util';
import { observer } from 'mobx-react';

export const useBalanceStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

const Balance = () => {
  const classes = useBalanceStyles();
  const balanceStore = useStore(BalanceStore);

  useEffect(() => {
    balanceStore.fetchBalances().catch(console.error);
  }, [balanceStore, balanceStore.balances]);

  return (
    <div className={classes.root}>
      <div>
        <FormattedMessage
          id='currentBalance'
          defaultMessage='Your current balance is'
        />
      </div>
      {balanceStore.balances.map((model) => (
        <BalanceItem
          key={model.currency}
          balance={model.balance}
          currency={model.currency}
        />
      ))}
    </div>
  );
};

export default observer(Balance);
