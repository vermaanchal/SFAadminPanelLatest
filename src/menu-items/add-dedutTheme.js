import FormatPaintOutlinedIcon from '@mui/icons-material/FormatPaintOutlined';

const icons = {
  FormatPaintOutlinedIcon
};

const updateTheme = {
  id: 'update-theme',
  type: 'group',
  icon: icons.FormatPaintOutlinedIcon,
  children: [
    {
      id: 'update-theme',
      title: 'Add/Remove Theme',
      type: 'item',
      url: '/updateTheme',
      icon: icons.FormatPaintOutlinedIcon
    }
  ]
};

export default updateTheme;
