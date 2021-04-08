import { Button, Modal, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { TransactionType } from '../../Transactions/Transaction.types';
import { BalanceCurrency } from '../Balance.types';
import { useBalanceModalStyle } from './BalanceModal.styles';

interface BalanceModalProps {
  currency: BalanceCurrency;
  operation: TransactionType;
  isOpen: boolean;
  onClose(): void;
}

const BalanceModal = ({
  currency,
  operation,
  isOpen,
  onClose,
}: BalanceModalProps) => {
  const classes = useBalanceModalStyle();
  const [amount, setAmount] = useState('');
  const intl = useIntl();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onClose();
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby='balance-modal-title'
      aria-describedby='balance-modal-description'>
      <form
        onSubmit={handleSubmit}
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        className={classes.root}>
        <div id='balance-modal-title'>
          {operation.toUpperCase()} ({currency.toUpperCase()})
        </div>
        <div id='balance-modal-description'>
          <TextField
            label={intl.formatMessage({ id: 'amount', description: 'Amount' })}
            value={amount}
            onChange={handleAmountChange}
          />
          <Button color='primary' variant='contained' type='submit'>
            {operation}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BalanceModal;
