// assets
import { DashboardOutlined } from '@ant-design/icons';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';

// icons
const icons = {
  DashboardOutlined,PersonSearchOutlinedIcon,RadioButtonCheckedSharpIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const addDesignation = {
  id: 'update-ride',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'add-designation',
      title: 'Add Designation',
      type: 'item',
      url: '/CreateDesignation',
      // icon: icons.PersonSearchOutlinedIcon,
      icon: icons.RadioButtonCheckedSharpIcon,
      // breadcrumbs: false
    }
  ]
};

export default addDesignation;
