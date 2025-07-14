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

const getAllResellerSummary = {
  id: 'reseller-summary',
//   title: 'Get All Reseller Summary',
  type: 'group',
  children: [
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

export default getAllResellerSummary;
