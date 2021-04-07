import React from 'react';
import { MenuItemEnum } from './Dashboard.types';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export function getIconByText(text: MenuItemEnum) {
  const result = {
    // [MenuItemEnum.Exchange]: <AccountBalanceWalletIcon />,
    [MenuItemEnum.Balance]: <AccountBalanceWalletIcon />,
    [MenuItemEnum.Transactions]: <DashboardIcon />,
    [MenuItemEnum.Profile]: <AccountCircleIcon />,
  };

  return result[text];
}
