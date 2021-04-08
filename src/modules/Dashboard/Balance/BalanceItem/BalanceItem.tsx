import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { BalanceCurrency, BalanceOperation } from '../Balance.types';
import { useBalanceItemStyles } from './BalanceItem.styles';
import BalanceModal from '../BalanceModal/BalanceModal';

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
  const [isOpen, setOpen] = useState<boolean>(false);
  const [operation, setOperation] = useState<BalanceOperation>(
    BalanceOperation.Deposit
  );

  const handleOperation = (prop: BalanceOperation) => (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    setOperation(prop);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BalanceModal
        currency={currency}
        operation={operation}
        isOpen={isOpen}
        onClose={handleClose}
      />

      <div className={classes.mainContainer}>
        <div className={classes.subContainer}>
          <div>
            {currencies[currency]} ({currency.toUpperCase()})
            {balance.toFixed(6)}
          </div>

          <div className={classes.buttons}>
            <Button
              onClick={handleOperation(BalanceOperation.Deposit)}
              color='primary'
              variant='contained'>
              Deposit
            </Button>
            <Button
              onClick={handleOperation(BalanceOperation.Withdraw)}
              color='primary'
              variant='contained'>
              Withdraw
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceItem;
