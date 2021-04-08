import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useStore } from '../../../../utils/ioc.util';
import { TransactionStatus } from '../../../Dashboard/Transactions/Transaction.types';
import { useStyles } from '../../styles';

interface Props {
  color: string;
}

const useStatusStyles = makeStyles({
  status: (props: Props) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& b': {
      fontSize: '24px',
      fontWeight: 700,
    },
    '& span': {
      fontSize: '18px',
      margin: '0 10px',
      fontWeight: 400,
      color: props.color,
    },
  }),
});

function getColorByTransactionStatus(status: TransactionStatus) {
  const colors = {
    [TransactionStatus.Pending]: 'blue',
    [TransactionStatus.Transfering]: 'red',
    [TransactionStatus.Declined]: 'red',
    [TransactionStatus.Completed]: 'green',
  };

  return colors[status];
}

function SecondStage() {
  // const transactionStore = useStore(TransactionStore);

  const classes = useStyles();
  const props = {
    color: getColorByTransactionStatus(TransactionStatus.Pending),
  };
  const statusStyles = useStatusStyles(props);

  return (
    <div>
      <div className={classes.root}>Status</div>
    </div>
  );
}

export default SecondStage;
