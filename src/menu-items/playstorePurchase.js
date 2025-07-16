import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';

const icons = {
  AccountBalanceWalletOutlinedIcon,
  ShoppingCartOutlinedIcon,
  LockResetOutlinedIcon
};

// ==============================|| MENU ITEMS - PURCHASE & WALLET ||============================== //

const playstorepurchase = {
  id: 'playStorePurchaseRecord',
  title: 'Purchase & Wallet',
  type: 'group',
  icon: icons.AccountBalanceWalletOutlinedIcon,
  children: [
    {
      id: 'play-Store-Purchase-Record',
      title: 'Play Store Purchase Record',
      type: 'item',
      url: '/playStorePurchaseRecord',
      icon: icons.ShoppingCartOutlinedIcon
    },
    {
      id: 'walletFreezeunfreeze',
      title: 'Wallet Freeze/Unfreeze',
      type: 'item',
      url: '/walletFreezeUnfreeze',
      icon: icons.LockResetOutlinedIcon
    }
  ]
};

export default playstorepurchase;
