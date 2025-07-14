// assets
import { VideoCameraAddOutlined } from '@ant-design/icons';
import ReduceCapacityOutlinedIcon from '@mui/icons-material/ReduceCapacityOutlined';
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';

// icons
const icons = {
  VideoCameraAddOutlined,ReduceCapacityOutlinedIcon,RadioButtonCheckedSharpIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const assignrole = {
  id: 'assign-role',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'assign-role',
      title: 'Assign Role',
      type: 'item',
      url: '/AssignRole',
      // icon: icons.ReduceCapacityOutlinedIcon,
      icon: icons.RadioButtonCheckedSharpIcon,
      // breadcrumbs: false
    }
  ]
};

export default assignrole;
