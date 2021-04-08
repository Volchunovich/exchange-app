import { makeStyles, Theme } from "@material-ui/core";

export const useBalanceItemStyles = makeStyles((theme: Theme) => ({
  buttons: {
    '& .MuiButton-root': {
      margin: theme.spacing(1),
    },
  },
  mainContainer: {
    padding: '6px',
    borderBottom: '2px solid #3f51b5',
  },
  subContainer: {
    padding: '18px', 

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));