import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined';
import ScatterPlotOutlinedIcon from '@mui/icons-material/ScatterPlotOutlined';

const icons = {
  SportsEsportsOutlinedIcon,
  HelpOutlineIcon,
  HistoryOutlinedIcon,
  LoyaltyOutlinedIcon,
  CasinoOutlinedIcon,
  StarOutlineIcon,
  RotateRightOutlinedIcon,
  ScatterPlotOutlinedIcon
};

const games = {
  id: 'game',
  title: 'Game',
  type: 'group',
  icon: icons.SportsEsportsOutlinedIcon,
  children: [
    {
      id: 'sfa-guess',
      title: 'SFA Guess',
      type: 'item',
      url: '/SFAgame',
      icon: icons.HelpOutlineIcon
    },
    {
      id: 'sfa-guess-record',
      title: 'SFA Guess Record',
      type: 'item',
      url: '/sfa-guess-record',
      icon: icons.HistoryOutlinedIcon
    },
    {
      id: 'teen-patti',
      title: 'Teen Patti',
      type: 'item',
      url: '/TeenPati',
      icon: icons.LoyaltyOutlinedIcon
    },
    {
      id: 'fruit-slot',
      title: 'Fruit Slot',
      type: 'item',
      url: '/Fruitslot',
      icon: icons.CasinoOutlinedIcon
    },
    {
      id: '777',
      title: '777 Game',
      type: 'item',
      url: '/TrippleSeven_Game',
      icon: icons.StarOutlineIcon
    },
    {
      id: 'spingame',
      title: 'SFA Spin Game',
      type: 'item',
      url: '/SFASpinGame',
      icon: icons.RotateRightOutlinedIcon
    },
    {
      id: 'sfaKeno',
      title: 'SFA Keno',
      type: 'item',
      url: '/SFAkeno',
      icon: icons.ScatterPlotOutlinedIcon
    }
  ]
};

export default games;
