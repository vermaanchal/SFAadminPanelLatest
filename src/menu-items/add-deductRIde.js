import ElectricScooterOutlinedIcon from '@mui/icons-material/ElectricScooterOutlined';

const icons = {
  ElectricScooterOutlinedIcon
};

const updateRides = {
  id: 'update-ride',
  type: 'group',
  icon: icons.ElectricScooterOutlinedIcon,
  children: [
    {
      id: 'add-deduct-ride',
      title: 'Add / Remove Ride',
      type: 'item',
      url: '/UserRide',
      icon: icons.ElectricScooterOutlinedIcon
    }
  ]
};

export default updateRides;
