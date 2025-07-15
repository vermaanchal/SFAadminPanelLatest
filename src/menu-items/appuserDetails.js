// assets (MUI-only)
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

// icons
const icons = {
  GroupOutlinedIcon,
  PersonOutlineIcon,
  PhotoLibraryOutlinedIcon,
  GroupsOutlinedIcon,
  HowToRegOutlinedIcon,
  WorkOutlineIcon
};

// ==============================|| MENU ITEMS - USER MANAGEMENT ||============================== //

const appUserDetail = {
  id: 'app-user',
  title: 'User Management',
  type: 'group',
  icon: icons.GroupOutlinedIcon, // ✅ Group icon
  children: [
    {
      id: 'app-user-details',
      title: 'App User Details',
      type: 'item',
      url: '/appuserdetails',
      icon: icons.PersonOutlineIcon
    },
    {
      id: 'app-user-details1',
      title: 'Moment Upload List',
      type: 'item',
      url: '/MomentUploadList',
      icon: icons.PhotoLibraryOutlinedIcon
    },
    {
      id: 'app-user-details2',
      title: 'Admin/Agency/Host',
      type: 'item',
      url: '/AdminAgencyHost',
      icon: icons.GroupsOutlinedIcon
    },
    {
      id: 'app-user-details3',
      title: 'Assign Role',
      type: 'item',
      url: '/AssignRole',
      icon: icons.HowToRegOutlinedIcon
    },
    {
      id: 'app-user-details4',
      title: 'Add Designation',
      type: 'item',
      url: '/CreateDesignation',
      icon: icons.WorkOutlineIcon
    }
  ]
};

export default appUserDetail;
