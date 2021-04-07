import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  TextField,
  MenuItem,
} from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import { CurrencyType } from '../Exchange.types';
import { FormattedMessage, useIntl } from 'react-intl';

interface ExchangeRowProps {
  value: string;
  currency: string;
  currencies: CurrencyType[];
  handleAmountChange(e: ChangeEvent<HTMLInputElement>): void;
  handleSelectChange(e: ChangeEvent<HTMLInputElement>): void;
  currencyLabel: string | undefined;
}

export const ExchangeRow = ({
  value,
  currency,
  currencies,
  currencyLabel,
  handleAmountChange,
  handleSelectChange,
}: ExchangeRowProps) => {
  const intl = useIntl();
  return (
    <Box display='flex'>
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='outlined-adornment-amount'>
          <FormattedMessage
            id='amount'
            defaultMessage='Amount'
            description='amount'
          />
        </InputLabel>
        <OutlinedInput
          value={value}
          onChange={handleAmountChange}
          startAdornment={
            <InputAdornment position='start'>{currencyLabel}</InputAdornment>
          }
          labelWidth={60}
        />
      </FormControl>
      <TextField
        select
        label={intl.formatMessage({
          id: 'currency',
          defaultMessage: 'Currency',
          description: 'currency',
        })}
        value={currency}
        onChange={handleSelectChange}>
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};
