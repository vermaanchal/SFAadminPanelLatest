// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';

// icons
const icons = {
  AdminPanelSettingsOutlinedIcon,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  ContactPhoneOutlinedIcon,
  SupportAgentOutlinedIcon,
  SupervisorAccountOutlinedIcon,RadioButtonCheckedSharpIcon
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const requests = {
  id: 'requests',
  title: 'Requests',
  type: 'group',
  children: [
    {
      id: 'admin-request',
      title: 'Admin Request',
      type: 'item',
      url: '/AdminRequest',
      // icon: icons.AdminPanelSettingsOutlinedIcon
      icon: icons.RadioButtonCheckedSharpIcon
    },
    {
      id: 'agency-request',
      title: 'Agency Request',
      type: 'item',
      url: '/AgencyRequest',
      // icon: icons.SupportAgentOutlinedIcon
      icon: icons.RadioButtonCheckedSharpIcon
    },
    {
      id: 'host-request',
      title: 'Host Request',
      type: 'item',
      url: '/HostRequest',
      // icon: icons.ContactPhoneOutlinedIcon
      icon: icons.RadioButtonCheckedSharpIcon
    },
    // {
    //   id: 'admin-agency-host',
    //   title: ' Admin/Agency/Host',
    //   type: 'item',
    //   url: '/AdminAgencyHost',
    //   icon: icons.SupervisorAccountOutlinedIcon,
    //   // breadcrumbs: false
    // },
    // {
    //   id: 'agent-request',
    //   title: 'Agent Request',
    //   type: 'item',
    //   url: '/AgentRequest',
    //   // icon: icons.ContactPhoneOutlinedIcon
    //   icon: icons.RadioButtonCheckedSharpIcon
    // },
   
  ]
};

export default requests;
