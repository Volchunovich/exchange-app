import { makeStyles, Theme } from '@material-ui/core';

export const useHeaderLanguageStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormLabel-root, .MuiInputBase-root, .MuiSvgIcon-root': {
      color: '#fff',
    },
    '& .MuiInput-underline::after': {
      borderBottom: '2px solid #fff'
    }
  }
}));