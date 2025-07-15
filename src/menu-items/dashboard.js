import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

// icons
const icons = {
  DashboardOutlinedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Dashboard',
  type: 'group',
  icon: icons.DashboardOutlinedIcon,
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlinedIcon,
      breadcrumbs: false,
    }
  ]
};

export default dashboard;
