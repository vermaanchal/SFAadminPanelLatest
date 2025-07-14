// assets
import { DashboardOutlined } from '@ant-design/icons';
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';


// icons
const icons = {
  DashboardOutlined,RadioButtonCheckedSharpIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const updateBeans = {
  id: 'update-beans',
  // title: 'Coin / Bean Management',
  type: 'group',
  children: [
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

export default updateBeans;
