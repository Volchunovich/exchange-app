import React from 'react';
import { Button, makeStyles, Theme } from '@material-ui/core';

export const useBalanceItemStyles = makeStyles((theme: Theme) => ({
  buttons: {
    '& .MuiButton-root': {
      margin: theme.spacing(1),
    },
  },
  mainContainer: {
    padding: '6px',
    borderBottom: '2px solid #3f51b5',
    // boxShadow: '0px 0px 3px #000',

    // backgroundImage:
    // 'linear-gradient(to top, #3f51b5, #6c6ec3, #918dd1, #b3aedf, #d4d0ed, #e2dff3, #f1eff9, #fafafa, #fafafa, #fafafa, #fafafa, #fafafa)',
  },
  subContainer: {
    padding: '18px',
    // borderBottom: '2px solid #000',
    // background: '#ffffff',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

interface Props {
  prefix: string;
  balance: string;
}

const BalanceItem = ({ balance, prefix }: Props) => {
  const classes = useBalanceItemStyles();
  return (
    <div className={classes.mainContainer}>
      <div className={classes.subContainer}>
        <div>
          {prefix} - {balance}
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
