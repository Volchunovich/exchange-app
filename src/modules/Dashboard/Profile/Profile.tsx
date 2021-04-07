import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  makeStyles,
  Paper,
  TextField,
  Theme,
} from '@material-ui/core';
import { useIntl } from 'react-intl';
import { UserStore } from '../User/User.store';
import { useStore } from '../../../utils/ioc.util';

import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

const useProfileStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '30px',
    '& .MuiPaper-root': {
      display: 'flex',
      flexDirection: 'column',

      padding: '30px',
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(3),
    },
  },
}));

interface State {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const Profile = () => {
  const classes = useProfileStyles();
  const intl = useIntl();
  const store = useStore(UserStore);
  const [values, setValues] = useState<State>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const [disabled, setDisabled] = useState<boolean>(true);

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleEditButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setDisabled(false);
  };

  const handleSaveButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setDisabled(true);
  };

  useEffect(() => {
    store.getUser().then((model) => {
      setValues({
        firstName: model.firstName,
        lastName: model.lastName,
        email: model.email,
        phoneNumber: model.phoneNumber,
      });
    });
  }, [store]);

  return (
    <div className={classes.root}>
      <Paper>
        Profile
        <TextField
          label={intl.formatMessage({
            id: 'firstName',
            defaultMessage: 'First Name',
          })}
          onChange={handleChange('firstName')}
          value={values.firstName}
          disabled={disabled}
        />
        <TextField
          label={intl.formatMessage({
            id: 'lastName',
            defaultMessage: 'Last Name',
          })}
          onChange={handleChange('lastName')}
          value={values.lastName}
          disabled={disabled}
        />
        <TextField
          label={intl.formatMessage({
            id: 'email',
            defaultMessage: 'E-mail',
          })}
          onChange={handleChange('email')}
          value={values.email}
          disabled={disabled}
        />
        <TextField
          label={intl.formatMessage({
            id: 'phoneNumber',
            defaultMessage: 'Phone number',
          })}
          onChange={handleChange('phoneNumber')}
          value={values.phoneNumber}
          disabled={disabled}
        />
        <Box display='flex'>
          <Button onClick={handleEditButton} disabled={!disabled}>
            <EditIcon />
            Edit
          </Button>

          <Button onClick={handleSaveButton} disabled={disabled}>
            <SaveIcon />
            Save
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default Profile;
