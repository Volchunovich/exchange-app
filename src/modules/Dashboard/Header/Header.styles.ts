import { makeStyles, Theme } from "@material-ui/core";

export const useHeaderStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    height: '100%',
  },
}));