// assets
import { VideoCameraAddOutlined } from '@ant-design/icons';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';


// icons
const icons = {
  VideoCameraAddOutlined,ContactMailOutlinedIcon,RadioButtonCheckedSharpIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const userReportfeedback = {
  id: 'user-report-feedback',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'user-report-feedback',
      title: 'UserReport &Feedback',
      type: 'item',
      url: '/UserReport',
      // icon: icons.ContactMailOutlinedIcon,
      icon: icons.RadioButtonCheckedSharpIcon,
      // breadcrumbs: false
    }
  ]
};

export default userReportfeedback;
