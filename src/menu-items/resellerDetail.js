import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';

const icons = {
  StorefrontOutlinedIcon,
  PersonAddAltOutlinedIcon,
  CurrencyExchangeOutlinedIcon,
  RemoveCircleOutlineIcon,
  SummarizeOutlinedIcon
};

const resellerDetails = {
  id: 'reseller-details',
  title: 'Reseller Details',
  type: 'group',
  icon: icons.StorefrontOutlinedIcon,
  children: [
    {
      id: 'create-reseller',
      title: 'Create Reseller',
      type: 'item',
      url: '/Reseller',
      icon: icons.PersonAddAltOutlinedIcon
    },
    {
      id: 'coin-reselling',
      title: 'Coin Reselling',
      type: 'item',
      url: '/CoinResell',
      icon: icons.CurrencyExchangeOutlinedIcon
    },
    {
      id: 'deduct-reseller-coins',
      title: 'Deduct Reseller Coins',
      type: 'item',
      url: '/DeductResellCoin',
      icon: icons.RemoveCircleOutlineIcon
    },
    {
      id: 'reseller-summary',
      title: 'Get All Reseller Summary',
      type: 'item',
      url: '/GetAllResellerSummary',
      icon: icons.SummarizeOutlinedIcon
    }
  ]
};

export default resellerDetails;
