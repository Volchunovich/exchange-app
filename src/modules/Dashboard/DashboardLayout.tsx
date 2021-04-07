import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
} from '@material-ui/core';
import React, { ReactNode, useState } from 'react';
import clsx from 'clsx';
import { useDashboardStyles } from './Dashboard.styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Header from './Header/Header';
import { MenuItemValueType } from './Dashboard.types';
import { MenuItems, SubMenuItems } from './Dashboard.const';
import { getIconByText } from './Dashboard.utils';
import { useHistory } from 'react-router-dom';

interface MenuState {
  // exchange: boolean;
  balance: boolean;
  transactions: boolean;
  profile: boolean;
}

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const classes = useDashboardStyles();
  const theme = useTheme();
  const history = useHistory();

  const [open, setOpen] = useState<boolean>(false);
  const [menus, setMenus] = useState<MenuState>({
    // exchange: true,
    balance: true,
    transactions: false,
    profile: false,
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleItemClick = (value: MenuItemValueType) => (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    setMenus({
      balance: value === 'balance',
      transactions: value === 'transactions',
      profile: value === 'profile',
    });

    history.push(`/dashboard/${value}`);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}>
            <MenuIcon />
          </IconButton>
          <Header />
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}>
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {MenuItems.map((item) => (
            <ListItem
              onClick={handleItemClick(item.value)}
              button
              selected={menus[item.value]}
              key={item.value}>
              <ListItemIcon>{getIconByText(item.name)}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {SubMenuItems.map((item) => (
            <ListItem
              onClick={handleItemClick(item.value)}
              button
              selected={menus[item.value]}
              key={item.value}>
              <ListItemIcon>{getIconByText(item.name)}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
