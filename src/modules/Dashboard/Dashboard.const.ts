import { MenuItem, MenuItemEnum } from "./Dashboard.types";

export const MenuItems: MenuItem[] = [
  {
    name: MenuItemEnum.Balance,
    value: 'balance',
  },
  {
    name: MenuItemEnum.Transactions,
    value: 'transactions',
  },
];

export const SubMenuItems: MenuItem[] = [
  {
    name: MenuItemEnum.Profile,
    value: 'profile'
  }
];