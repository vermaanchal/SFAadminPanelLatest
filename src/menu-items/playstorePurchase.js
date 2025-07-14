// assets
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import GamepadOutlinedIcon from '@mui/icons-material/GamepadOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';

// icons
const icons = {
  DriveFolderUploadIcon, GamepadOutlinedIcon,AccountBalanceWalletOutlinedIcon,RadioButtonCheckedSharpIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const playstorepurchase = {
  id: 'playStorePurchaseRecord',
  title: 'Purchase & Wallet',
  type: 'group',
  children: [
    {
      id: 'play-Store-Purchase-Record',
      title: 'Play Store Purchase Record',
      type: 'item',
      url: '/playStorePurchaseRecord',
      // icon: icons.GamepadOutlinedIcon,
      icon: icons.RadioButtonCheckedSharpIcon,
      //   breadcrumbs: false
    },
     {
    id: 'walletFreezeunfreeze',
      title: 'Wallet Freeze/Unfreeze',
      type: 'item',
      url: '/walletFreezeUnfreeze',
      // icon: icons.AccountBalanceWalletOutlinedIcon,
      icon: icons.RadioButtonCheckedSharpIcon,
      // breadcrumbs: false
    },
   
  ]
};

export default playstorepurchase;
