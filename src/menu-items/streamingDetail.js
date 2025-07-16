import CastOutlinedIcon from '@mui/icons-material/CastOutlined';
import GraphicEqOutlinedIcon from '@mui/icons-material/GraphicEqOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import ConnectedTvOutlinedIcon from '@mui/icons-material/ConnectedTvOutlined';

const icons = {
  CastOutlinedIcon,
  GraphicEqOutlinedIcon,
  VideocamOutlinedIcon,
  VideoLibraryOutlinedIcon,
  ConnectedTvOutlinedIcon
};

const streamingDetail = {
  id: 'Streaming-details',
  title: 'Streaming Details',
  type: 'group',
  icon: icons.CastOutlinedIcon,
  children: [
    {
      id: 'audio-streaming',
      title: 'Audio Streaming',
      type: 'item',
      url: '/audiostreaming',
      icon: icons.GraphicEqOutlinedIcon
    },
    {
      id: 'video-streaming',
      title: 'Video Streaming',
      type: 'item',
      url: '/videostreaming',
      icon: icons.VideocamOutlinedIcon
    },
    {
      id: 'video-record',
      title: 'Video Record',
      type: 'item',
      url: '/VideoUploadRecord',
      icon: icons.VideoLibraryOutlinedIcon
    },
    {
      id: 'end-user-stream',
      title: 'End User Stream',
      type: 'item',
      url: '/UserLiveDetails',
      icon: icons.ConnectedTvOutlinedIcon
    }
  ]
};

export default streamingDetail;
