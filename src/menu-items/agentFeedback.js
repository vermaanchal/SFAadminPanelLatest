// assets
import { VideoCameraAddOutlined } from '@ant-design/icons';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';


// icons
const icons = {
  VideoCameraAddOutlined,ContactMailOutlinedIcon,RadioButtonCheckedSharpIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const agentReportfeedback = {
  id: 'agent-report-feedback',
  // title: 'Navigation',
  type: 'group',
  children: [
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

export default agentReportfeedback;
