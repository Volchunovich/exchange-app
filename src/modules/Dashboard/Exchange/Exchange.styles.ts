import { makeStyles, Theme } from "@material-ui/core";

export const useExchangeStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',

    '& .MuiBox-root, .MuiFormControl-root, .MuiTextField-root, .MuiButton-root, > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
    '& .MuiFormControl-root': {
      flex: 5,
    },
    '& .MuiTextField-root': {
      flex: 1,
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    padding: '30px',
    maxWidth: '500px',
  },
}));