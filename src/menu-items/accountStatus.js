import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import PhonelinkLockOutlinedIcon from '@mui/icons-material/PhonelinkLockOutlined';

const icons = {
  GppMaybeOutlinedIcon,
  BlockOutlinedIcon,
  PhonelinkLockOutlinedIcon
};

const accountStatus = {
  id: 'account-status',
  title: 'Account Status',
  type: 'group',
  icon: icons.GppMaybeOutlinedIcon,
  children: [
    {
      id: 'id-ban/unban',
      title: 'ID Ban/UnBan',
      type: 'item',
      url: '/IDBanUnBan',
      icon: icons.BlockOutlinedIcon
    },
    {
      id: 'device-id',
      title: 'Device Id Block/UnBlock',
      type: 'item',
      url: '/DeviceBlock',
      icon: icons.PhonelinkLockOutlinedIcon
    }
  ]
};

export default accountStatus;
