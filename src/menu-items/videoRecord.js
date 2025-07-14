// assets
import { VideoCameraAddOutlined } from '@ant-design/icons';
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';


// icons
const icons = {
  VideoCameraAddOutlined,RadioButtonCheckedSharpIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const VideoRecord = {
  id: 'video-record',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'video-record',
      title: 'Video Record',
      type: 'item',
      url: '/VideoUploadRecord',
      // icon: icons.VideoCameraAddOutlined,
      icon: icons.RadioButtonCheckedSharpIcon,
      // breadcrumbs: false
    }
  ]
};

export default VideoRecord;
