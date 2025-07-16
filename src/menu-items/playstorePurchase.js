import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';

const icons = {
  AccountBalanceWalletOutlinedIcon,
  ShoppingCartOutlinedIcon,
  LockResetOutlinedIcon,
  PriceChangeOutlinedIcon,
  AccountBalanceOutlinedIcon,
  AttachMoneyOutlinedIcon,
  EmojiEventsOutlinedIcon
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
    },
    {
      id: 'add-deduct-coins',
      title: 'Add/Deduct Coins',
      type: 'item',
      url: '/UpdateUserCoin',
      icon: icons.AttachMoneyOutlinedIcon
    },
    {
      id: 'add-deduct-beans',
      title: 'Add/Deduct Beans',
      type: 'item',
      url: '/BeanTransferView',
      icon: icons.EmojiEventsOutlinedIcon
    }
  ]
};

export default playstorepurchase;
