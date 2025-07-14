// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';

const icons = {
  DescriptionOutlinedIcon,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  ContactPhoneOutlinedIcon,
  ReceiptLongOutlinedIcon, ForwardToInboxOutlinedIcon, CalendarMonthIcon, RadioButtonCheckedSharpIcon
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const reports = {
  id: 'reports',
  title: 'Reports',
  type: 'group',
  children: [
    {
      id: 'receiving-report',
      title: 'Host Receiving Report',
      type: 'item',
      url: '/HostReceivingReport',
      // icon: icons.ReceiptLongOutlinedIcon
      icon: icons.RadioButtonCheckedSharpIcon
    },
    {
      id: 'sending-report',
      title: 'User Sending Report',
      type: 'item',
      url: '/UserSendingReport',
      // icon: icons.ForwardToInboxOutlinedIcon
      icon: icons.RadioButtonCheckedSharpIcon
    },
    {
      id: 'monthly-report',
      title: 'Monthly Report',
      type: 'item',
      url: '/MonthlySenderReport',
      // icon: icons.CalendarMonthIcon
      icon: icons.RadioButtonCheckedSharpIcon
    },
    {
          id: 'user-report-feedback',
          title: 'UserReport &Feedback',
          type: 'item',
          url: '/UserReport',
          // icon: icons.ContactMailOutlinedIcon,
          icon: icons.RadioButtonCheckedSharpIcon,
          // breadcrumbs: false
    },
    {
          id: 'agent-report-feedback',
          title: 'Agent Feedback Report',
          type: 'item',
          url: '/agentfeedback',
          // icon: icons.ContactMailOutlinedIcon,
          icon: icons.RadioButtonCheckedSharpIcon,
          // breadcrumbs: false
    }
  ]
};

export default reports;
