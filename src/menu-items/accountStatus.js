// assets
import { StopOutlined } from '@ant-design/icons';
import AppBlockingOutlinedIcon from '@mui/icons-material/AppBlockingOutlined';
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';

// icons
const icons = {
  StopOutlined,
  AppBlockingOutlinedIcon,RadioButtonCheckedSharpIcon
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const accountStatus = {
  id: 'account-status',
  title: 'Account Status',
  type: 'group',
  children: [
    {
      id: 'id-ban/unban',
      title: 'ID Ban/UnBan',
      type: 'item',
      url: '/IDBanUnBan',
      // icon: icons.StopOutlined
      icon: icons.RadioButtonCheckedSharpIcon
    },
    {
      id: 'device-id',
      title: 'Device Id Block/UnBlock',
      type: 'item',
      url: '/DeviceBlock',
      // icon: icons.AppBlockingOutlinedIcon,
      icon: icons.RadioButtonCheckedSharpIcon,
    }
  ]
};

export default accountStatus;
