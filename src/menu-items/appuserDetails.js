// assets
import { UserSwitchOutlined } from '@ant-design/icons';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';
// icons
const icons = {
  UserSwitchOutlined, SupervisorAccountOutlinedIcon,RadioButtonCheckedSharpIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const appUserDetail = {
  id: 'app-user',
  title: 'User Management',
  type: 'group',
  children: [
    {
      id: 'app-user-details',
      title: 'App User Details',
      type: 'item',
      url: '/appuserdetails',
      // icon: icons.UserSwitchOutlined,
      icon: icons.RadioButtonCheckedSharpIcon,
      //   breadcrumbs: false
    },
     {
      id: 'app-user-details1',
      title: 'Moment Upload List',
      type: 'item',
      url: '/MomentUploadList',
      icon: icons.RadioButtonCheckedSharpIcon,
    },
     {
      id: 'app-user-details2',
      title: 'Admin/Agency/Host',
      type: 'item',
      url: '/AdminAgencyHost',
      icon: icons.RadioButtonCheckedSharpIcon,
    },
         {
      id: 'app-user-details3',
      title: 'Assign Role',
      type: 'item',
      url: '/AssignRole',
      icon: icons.RadioButtonCheckedSharpIcon,
    },
            {
      id: 'app-user-details4',
      title: 'Add Designation',
      type: 'item',
      url: '/CreateDesignation',
      icon: icons.RadioButtonCheckedSharpIcon,
    },
  ],
  
};

export default appUserDetail;
