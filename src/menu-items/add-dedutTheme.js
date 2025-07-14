// assets
import { DashboardOutlined } from '@ant-design/icons';
// import FilterFramesOutlinedIcon from '@mui/icons-material/FilterFramesOutlined';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';

// icons
const icons = {
  DashboardOutlined,ColorLensIcon,RadioButtonCheckedSharpIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const updateTheme = {
  id: 'update-coins',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'update-theme',
      title: 'Add/Remove Theme',
      type: 'item',
      url: '/updateTheme',
      // icon: icons.ColorLensIcon,
      icon: icons.RadioButtonCheckedSharpIcon,
      // breadcrumbs: false
    }
  ]
};

export default updateTheme;
