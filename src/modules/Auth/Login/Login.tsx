import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from '../../../utils/ioc.util';
import { AuthStore } from '../AuthStore';
import { useLoginStyles } from './Login.styles';
import { OutLoginDTO } from '../Auth.types';

interface State {
  email: string;
  password: string;

  showPassword: boolean;
}

const Login = () => {
  const classes = useLoginStyles();
  const history = useHistory();
  const store = useStore(AuthStore);
  const intl = useIntl();
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: OutLoginDTO = {
      email: values.email,
      password: values.password,
    };
    store
      .login(payload)
      .then(() => {
        history.push('/dashboard');
      })
      .catch((res) => {
        console.error(res);
      });
  };

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <div className={classes.title}>
        <FormattedMessage
          id='signIn'
          defaultMessage='Sign In'
          description='sign in'
        />
      </div>
      <TextField
        onChange={handleChange('email')}
        value={values.email}
        label={intl.formatMessage({
          id: 'email',
          defaultMessage: 'Email',
          description: 'email',
        })}
        variant='outlined'
      />

      <FormControl variant='outlined'>
        <InputLabel htmlFor='outlined-adornment-password'>
          <FormattedMessage
            id='Password'
            defaultMessage='Password'
            description='password'
          />
        </InputLabel>
        <OutlinedInput
          id='outlined-adornment-password'
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'>
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
      <div className={classes.hasAccount}>
        <FormattedMessage
          id='doNotHaveAnAccount'
          defaultMessage="Don't have an account?"
          description='do not have an account?'
        />
        <Link to='/register'>
          <FormattedMessage
            id='signUp'
            defaultMessage='Sign Up'
            description='sign up'
          />
        </Link>
      </div>

      <Button type='submit' variant='contained' color='primary'>
        <FormattedMessage
          id='signIn'
          defaultMessage='Sign In'
          description='sign in'
        />
      </Button>
    </form>
  );
};

export default observer(Login);
