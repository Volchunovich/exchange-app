import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      background: 'rgba(145, 202, 242, .5)',
      borderRadius: '20px',
      padding: '20px',

      display: 'flex',
      flexDirection: 'column',
      // alignItems: 'center',
    },
    inner: {
      display: 'flex',
      '& > div': {
        flexGrow: 1,
      },
    },
  })
);