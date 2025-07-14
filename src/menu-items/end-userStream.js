// assets
import ConnectedTvOutlinedIcon from '@mui/icons-material/ConnectedTvOutlined';
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';
// icons
const icons = {
  ConnectedTvOutlinedIcon, RadioButtonCheckedSharpIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const endUserStream = {
  id: 'end-user-stream',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'end-user-stream',
      title: 'End User Stream',
      type: 'item',
      url: '/UserLiveDetails',
      // icon: icons.ConnectedTvOutlinedIcon,
      icon: icons.RadioButtonCheckedSharpIcon,
      // breadcrumbs: false
    }
  ]
};

export default endUserStream;
