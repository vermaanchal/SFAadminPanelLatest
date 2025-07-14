// assets
import { DashboardOutlined } from '@ant-design/icons';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
// import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';


// icons
const icons = {
  DashboardOutlined,MonetizationOnOutlinedIcon,PriceChangeOutlinedIcon,RadioButtonCheckedSharpIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const updateCoins = {
  id: 'update-coins',
  title: 'Coin / Bean Management',
  type: 'group',
  children: [
    {
      id: 'add-deduct-coins',
      title: 'Add/Deduct Coins ',
      type: 'item',
      url: '/UpdateUserCoin',
      // icon: icons.PriceChangeOutlinedIcon,
      icon: icons.RadioButtonCheckedSharpIcon,
      // breadcrumbs: false
    },
    {
          id: 'add-deduct-beans',
          title: 'Add/Deduct Beans ',
          type: 'item',
          url: '/BeanTransferView',
          // icon: icons.DashboardOutlined,
          icon: icons.RadioButtonCheckedSharpIcon,
          // breadcrumbs: false
        }
  ]
};

export default updateCoins;
