// assets
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReduceCapacityOutlinedIcon from '@mui/icons-material/ReduceCapacityOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';


// icons
const icons = {RadioButtonCheckedSharpIcon,
  DriveFolderUploadIcon, SupervisorAccountOutlinedIcon, ReduceCapacityOutlinedIcon, PersonSearchOutlinedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const momentUploadList = {
  id: 'moment-upload',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'moment-upload-list',
      title: 'Moment Upload List',
      type: 'item',
      url: '/MomentUploadList',
      // icon: icons.DriveFolderUploadIcon,
      icon: icons.RadioButtonCheckedSharpIcon,
      //   breadcrumbs: false
    },
    {
      id: 'admin-agency-host',
      title: ' Admin/Agency/Host',
      type: 'item',
      url: '/AdminAgencyHost',
      // icon: icons.SupervisorAccountOutlinedIcon,
      icon: icons.RadioButtonCheckedSharpIcon,
      breadcrumbs: false
    },

    
  ],
  id: 'moment-upload',


};

export default momentUploadList;
