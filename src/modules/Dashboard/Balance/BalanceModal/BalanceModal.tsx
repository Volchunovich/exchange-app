import { Button, Modal, TextField, makeStyles, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { BalanceOperation, BalanceCurrency } from '../Balance.types';

export const useBalanceModalStyle = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),

    '& .MuiTextField-root, .MuiButton-root': {
      margin: theme.spacing(1),
    },

    '& #balance-modal-title': {
      fontSize: '1.3em',
      borderBottom: '2px solid #3f51b5',
      margin: theme.spacing(1),
      textAlign: 'center',
    },

    '& #balance-modal-description': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
}));

interface BalanceModalProps {
  currency: BalanceCurrency;
  operation: BalanceOperation;
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
