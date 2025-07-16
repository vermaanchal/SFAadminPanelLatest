import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

const icons = {
  AccountBalanceOutlinedIcon,
  AccountBalanceWalletOutlinedIcon
};

const withdrawRecord = {
  id: 'withdrawRecord',
  title: 'Withdraw Record',
  type: 'group',
  icon: icons.AccountBalanceOutlinedIcon,
  children: [
    {
      id: 'bank',
      title: 'Bank',
      type: 'item',
      url: '/BankWithdraw',
      icon: icons.AccountBalanceOutlinedIcon
    },
    {
      id: 'wallet',
      title: 'Wallet',
      type: 'item',
      url: '/WalletWithdraw',
      icon: icons.AccountBalanceWalletOutlinedIcon
    }
  ]
};

export default withdrawRecord;
