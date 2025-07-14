// assets
import { DashboardOutlined } from '@ant-design/icons';

import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';
// icons
const icons = {
  DashboardOutlined,RadioButtonCheckedSharpIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      // icon: icons.DashboardOutlined,
      // icon: icons.RadioButtonCheckedSharpIcon,
      breadcrumbs: false,
    }
  ]
};

export default dashboard;
