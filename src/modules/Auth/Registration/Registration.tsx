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
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { useStore } from '../../../utils/ioc.util';
import { AuthStore } from '../AuthStore';
import { useRegistrationStyles } from './Registration.styles';

interface State {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  showPassword: boolean;
}

const Registration = () => {
  const classes = useRegistrationStyles();
  const intl = useIntl();
  const store = useStore(AuthStore);

  const [values, setValues] = useState<State>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
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

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.password === values.confirmPassword) {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
      };

      store.register(payload);
    }
  };

  return (
    <form onSubmit={handleSubmitForm} className={classes.root}>
      <div className={classes.title}>
        <FormattedMessage
          id='signUp'
          defaultMessage='Sign Up'
          description='sign up'
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
      <TextField
        onChange={handleChange('phoneNumber')}
        value={values.phoneNumber}
        label={intl.formatMessage({
          id: 'phoneNumber',
          defaultMessage: 'phoneNumber',
          description: 'phoneNumber',
        })}
        variant='outlined'
      />

      <TextField
        onChange={handleChange('firstName')}
        value={values.firstName}
        label={intl.formatMessage({
          id: 'firstName',
          defaultMessage: 'firstName',
          description: 'firstName',
        })}
        variant='outlined'
      />

      <TextField
        onChange={handleChange('lastName')}
        value={values.lastName}
        label={intl.formatMessage({
          id: 'lastName',
          defaultMessage: 'lastName',
          description: 'lastName',
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

      <FormControl variant='outlined'>
        <InputLabel htmlFor='outlined-adornment-password'>
          <FormattedMessage
            id='confirmPassword'
            defaultMessage='Cofirm Password'
            description='confirm password'
          />
        </InputLabel>
        <OutlinedInput
          id='outlined-adornment-password'
          multiline
          type={values.showPassword ? 'text' : 'password'}
          value={values.confirmPassword}
          onChange={handleChange('confirmPassword')}
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
          id='doYouHaveAnAccount'
          defaultMessage='Do you have an account?'
          description='do you have an account?'
        />
        <Link to='/login'>
          <FormattedMessage
            id='signIn'
            defaultMessage='Sign In'
            description='sign in'
          />
        </Link>
      </div>

      <Button type='submit' variant='contained' color='primary'>
        <FormattedMessage
          id='signUp'
          defaultMessage='Sign Up'
          description='sign up'
        />
      </Button>
    </form>
  );
};

export default Registration;
