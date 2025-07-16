import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

const icons = {
  InsertChartOutlinedIcon,
  ReceiptLongOutlinedIcon,
  ForwardToInboxOutlinedIcon,
  CalendarMonthOutlinedIcon,
  FeedbackOutlinedIcon,
  ForumOutlinedIcon
};

const reports = {
  id: 'reports',
  title: 'Reports',
  type: 'group',
  icon: icons.InsertChartOutlinedIcon,
  children: [
    {
      id: 'receiving-report',
      title: 'Host Receiving Report',
      type: 'item',
      url: '/HostReceivingReport',
      icon: icons.ReceiptLongOutlinedIcon
    },
    {
      id: 'sending-report',
      title: 'User Sending Report',
      type: 'item',
      url: '/UserSendingReport',
      icon: icons.ForwardToInboxOutlinedIcon
    },
    {
      id: 'monthly-report',
      title: 'Monthly Report',
      type: 'item',
      url: '/MonthlySenderReport',
      icon: icons.CalendarMonthOutlinedIcon
    },
    {
      id: 'user-report-feedback',
      title: 'UserReport & Feedback',
      type: 'item',
      url: '/UserReport',
      icon: icons.FeedbackOutlinedIcon
    },
    {
      id: 'agent-report-feedback',
      title: 'Agent Feedback Report',
      type: 'item',
      url: '/agentfeedback',
      icon: icons.ForumOutlinedIcon
    }
  ]
};

export default reports;
