import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const icons = {
  SavingsIcon,
  AccountBalanceWalletIcon
};

// ==============================|| MENU ITEMS - BEAN MANAGEMENT ||============================== //

const updateBeans = {
  id: 'update-beans',
  title: 'Bean Management',
  type: 'group',
  icon: icons.SavingsIcon,
  children: [
    {
      id: 'add-deduct-beans',
      title: 'Add / Deduct Beans',
      type: 'item',
      url: '/BeanTransferView',
      icon: icons.AccountBalanceWalletIcon
    }
  ]
};

export default updateBeans;
