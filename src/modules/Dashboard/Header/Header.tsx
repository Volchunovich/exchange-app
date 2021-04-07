import React from 'react';
import { Container, Box } from '@material-ui/core';
import { useHeaderStyles } from './Header.styles';
import { observer } from 'mobx-react';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import HeaderLanguage from './HeaderLanguage/HeaderLanguage';

const Header = () => {
  const classes = useHeaderStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          width='300px'>
          <div>LOGO</div>
          <HeaderLanguage />
        </Box>

        <HeaderMenu />
      </Container>
    </div>
  );
};

export default observer(Header);
