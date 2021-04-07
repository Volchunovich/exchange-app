import { makeStyles, Theme } from "@material-ui/core";

export const useLoginStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    padding: '20px',

    border: '1px solid #6b16f3',
    borderRadius: '20px',

    width: '400px',

    background: '#f3ecfe',

    '& .MuiTextField-root, .MuiFormControl-root, > *': {
      margin: theme.spacing(1),
      maxWidth: '100%',
    },
  },
  title: {
    borderBottom: '1px solid #6b16f3',
    margin: '10px 0',
    textAlign: 'center',
    color: '#062337',
    fontSize: '1.5em',
  },
  hasAccount: {
    fontSize: '1em',
    color: '#6b16f3',
  },
}));