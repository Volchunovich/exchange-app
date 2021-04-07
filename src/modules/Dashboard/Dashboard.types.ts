export enum MenuItemEnum {
  // Exchange = 'Exchange',
  Balance = 'Balance',
  Transactions = 'Transactions',
  Profile = 'Profile',
}

export type MenuItemValueType = 'balance' | 'transactions' | 'profile';

export interface MenuItem {
  name: MenuItemEnum;
  value: MenuItemValueType;
}