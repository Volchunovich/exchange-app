import { makeStyles, Theme } from '@material-ui/core';
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