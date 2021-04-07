import React, { useState, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { makeStyles, Theme } from '@material-ui/core';
import BalanceItem from './BalanceItem/BalanceItem';

export const useBalanceStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

const Balance = () => {
  const classes = useBalanceStyles();
  const intl = useIntl();

  return (
    <div className={classes.root}>
      <div>
        <FormattedMessage
          id='currentBalance'
          defaultMessage='Your current balance is'
        />
      </div>
      <BalanceItem balance='30' prefix='$' />
      <BalanceItem balance='100' prefix='E' />
    </div>
  );
};

export default Balance;
