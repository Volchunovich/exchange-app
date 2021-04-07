import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { observer } from 'mobx-react';
import React, { FormEvent, useState } from 'react';
import InputMask from 'react-input-mask';
import { FormattedMessage } from 'react-intl';
import { useStore } from '../../../../utils/ioc.util';
import { PlatformStore } from '../../Platform.store';
import { TransactionStore } from '../../services/Transaction/TransactionStore';
import { useStyles } from '../../styles';

interface State {
  cardNumber: string;
  expiration: string;
  cvc: string;
  fullName: string;
  showCvc: boolean;
}

function FirstStage() {
  const classes = useStyles();
  const [values, setValues] = useState<State>({
    cardNumber: '',
    expiration: '',
    cvc: '',
    fullName: '',
    showCvc: false,
  });

  const platformStore = useStore(PlatformStore);
  const transactionStore = useStore(TransactionStore);

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showCvc: !values.showCvc });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const startBuying = () => {
    transactionStore.fetchTransaction(values).then((res) => {
      platformStore.nextStep();
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: сделать имитацию банкового запроса
    startBuying();
  };

  const onClickBuy = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    startBuying();
  };

  return (
    <form onSubmit={onSubmit} className={classes.root}>
      <h1>Payment process</h1>
      <InputMask
        mask='9999 9999 9999 9999'
        value={values.cardNumber}
        onChange={handleChange('cardNumber')}>
        {() => <TextField required label='Card number' />}
      </InputMask>
      <div className={classes.inner}>
        <InputMask
          mask='99/99'
          value={values.expiration}
          onChange={handleChange('expiration')}>
          {() => <TextField required label='Expiration' />}
        </InputMask>
        <InputMask mask='999' value={values.cvc} onChange={handleChange('cvc')}>
          {() => (
            <FormControl required>
              <InputLabel htmlFor='standard-adornment-password'>CVC</InputLabel>
              <Input
                id='standard-adornment-password'
                type={values.showCvc ? 'text' : 'password'}
                value={values.cvc}
                onChange={handleChange('cvc')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle cvc visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}>
                      {values.showCvc ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          )}
        </InputMask>
      </div>
      <TextField
        required
        label='Full name'
        value={values.fullName}
        onChange={handleChange('fullName')}
      />

      <Button
        type='submit'
        onClick={onClickBuy}
        variant='contained'
        color='primary'>
        <FormattedMessage id='buy' defaultMessage='Buy' />
      </Button>
    </form>
  );
}

export default observer(FirstStage);
