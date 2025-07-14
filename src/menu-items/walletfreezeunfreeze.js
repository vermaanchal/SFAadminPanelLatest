// assets
import { DashboardOutlined } from '@ant-design/icons';
// import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';

// icons
const icons = {
  DashboardOutlined, AccountBalanceWalletOutlinedIcon, RadioButtonCheckedSharpIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const walletFreezeunfreeze = {
  id: 'update-ride',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'walletFreezeunfreeze',
      title: 'Wallet Freeze/Unfreeze',
      type: 'item',
      url: '/walletFreezeUnfreeze',
      // icon: icons.AccountBalanceWalletOutlinedIcon,
      icon: icons.RadioButtonCheckedSharpIcon,
      // breadcrumbs: false
    }
  ]
};

export default walletFreezeunfreeze;
