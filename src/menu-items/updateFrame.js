import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import FilterFramesOutlinedIcon from '@mui/icons-material/FilterFramesOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ElectricScooterOutlinedIcon from '@mui/icons-material/ElectricScooterOutlined';

const icons = {
  DesignServicesOutlinedIcon,
  FilterFramesOutlinedIcon,
  ColorLensOutlinedIcon,
  ElectricScooterOutlinedIcon
};

const updateFrame = {
  id: 'update-coins',
  title: 'Customizations',
  type: 'group',
  icon: icons.DesignServicesOutlinedIcon,
  children: [
    {
      id: 'update-frame',
      title: 'Add/Remove Frame',
      type: 'item',
      url: '/updateFrame',
      icon: icons.FilterFramesOutlinedIcon
    },
    {
      id: 'update-theme',
      title: 'Add/Remove Theme',
      type: 'item',
      url: '/updateTheme',
      icon: icons.ColorLensOutlinedIcon
    },
    {
      id: 'add-deduct-ride',
      title: 'Add/Remove Ride',
      type: 'item',
      url: '/UserRide',
      icon: icons.ElectricScooterOutlinedIcon
    }
  ]
};

export default updateFrame;
