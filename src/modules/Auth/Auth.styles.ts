import { makeStyles, Theme } from '@material-ui/core';

export const useAuthStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));