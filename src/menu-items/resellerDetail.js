// assets
import { AccountBookOutlined } from '@ant-design/icons';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';

// icons
const icons = {
  SaveAsOutlinedIcon,
  AccountBookOutlined,
  CurrencyExchangeOutlinedIcon,
  MonetizationOnOutlinedIcon,RadioButtonCheckedSharpIcon
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const resellerDetails = {
  id: 'reseller-details',
  title: 'Reseller Details',
  type: 'group',
  children: [
    {
      id: 'create-reseller',
      title: 'Create Reseller',
      type: 'item',
      url: '/Reseller',
      // icon: icons.SaveAsOutlinedIcon
      icon: icons.RadioButtonCheckedSharpIcon
    },
    {
      id: 'coin-reselling',
      title: 'Coin Reselling',
      type: 'item',
      url: '/CoinResell',
      // icon: icons.CurrencyExchangeOutlinedIcon,
      icon: icons.RadioButtonCheckedSharpIcon,
    },
    {
        id: 'deduct-reseller-coins',
        title: 'Deduct Reseller Coins',
        type: 'item',
        url: '/DeductResellCoin',
        // icon: icons.MonetizationOnOutlinedIcon,
        icon: icons.RadioButtonCheckedSharpIcon,
      },
        {
            id: 'Reseler Summary',
            title: 'Get All Reseller Summary',
            type: 'item',
            url: '/GetAllResellerSummary',
            // icon: icons.SaveAsOutlinedIcon
            icon: icons.RadioButtonCheckedSharpIcon
          },
  ]
};

export default resellerDetails;
