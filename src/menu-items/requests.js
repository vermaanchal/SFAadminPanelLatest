import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';

const icons = {
  MailOutlineIcon,
  ShieldOutlinedIcon,
  BusinessCenterOutlinedIcon,
  RecordVoiceOverOutlinedIcon
};

const requests = {
  id: 'requests',
  title: 'Requests',
  type: 'group',
  icon: icons.MailOutlineIcon,
  children: [
    {
      id: 'admin-request',
      title: 'Admin Request',
      type: 'item',
      url: '/AdminRequest',
      icon: icons.ShieldOutlinedIcon
    },
    {
      id: 'agency-request',
      title: 'Agency Request',
      type: 'item',
      url: '/AgencyRequest',
      icon: icons.BusinessCenterOutlinedIcon
    },
    {
      id: 'host-request',
      title: 'Host Request',
      type: 'item',
      url: '/HostRequest',
      icon: icons.RecordVoiceOverOutlinedIcon
    }
  ]
};

export default requests;
