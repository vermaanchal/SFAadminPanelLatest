// assets
import { StopOutlined, AccountBookOutlined } from '@ant-design/icons';
import GamesOutlinedIcon from '@mui/icons-material/GamesOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import GamepadOutlinedIcon from '@mui/icons-material/GamepadOutlined';
import CasinoIcon from '@mui/icons-material/Casino';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';

// icons
const icons = {
  StopOutlined, LoyaltyOutlinedIcon, GamepadOutlinedIcon, RadioButtonCheckedSharpIcon,
  AccountBookOutlined, GamesOutlinedIcon, SportsEsportsOutlinedIcon, CasinoOutlinedIcon, CasinoIcon, ListAltOutlinedIcon
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const games = {
  id: 'game',
  title: 'Game',
  type: 'group',
  children: [
    {
      id: 'sfa-guess',
      title: 'SFA Guess',
      type: 'item',
      url: '/SFAgame',
      // icon: icons.GamesOutlinedIcon
      icon: icons.RadioButtonCheckedSharpIcon
    },
    {
      id: 'sfa-guess-record',
      title: 'SFA Guess Record',
      type: 'item',
      url: '/sfa-guess-record',
      // icon: icons.ListAltOutlinedIcon
      icon: icons.RadioButtonCheckedSharpIcon
    },
    {
      id: 'teen-patti',
      title: 'Teen Patti',
      type: 'item',
      url: '/TeenPati',
      // icon: icons.LoyaltyOutlinedIcon
      icon: icons.RadioButtonCheckedSharpIcon
    },
    {
      id: 'fruit-slot',
      title: 'Fruit Slot',
      type: 'item',
      url: '/Fruitslot',
      // icon: icons.SportsEsportsOutlinedIcon,
      icon: icons.RadioButtonCheckedSharpIcon,
    },
    {
      id: '777',
      title: '777 Game',
      type: 'item',
      url: '/TrippleSeven_Game',
      // icon: icons.CasinoOutlinedIcon,
      icon: icons.RadioButtonCheckedSharpIcon,
    },
    {
      id: 'spingame',
      title: 'SFA Spin Game',
      type: 'item',
      url: '/SFASpinGame',
      // icon: icons.GamepadOutlinedIcon,
      icon: icons.RadioButtonCheckedSharpIcon,
    },
    // {
    //   id: 'sfaLudo',
    //   title: 'SFA Ludo',
    //   type: 'item',
    //   url: '/SFAludo',
    //   // icon: icons.CasinoIcon
    //   icon: icons.RadioButtonCheckedSharpIcon
    // },
    {
      id: 'sfaKeno',
      title: 'SFA Keno',
      type: 'item',
      url: '/SFAkeno',
      // icon: icons.LoyaltyOutlinedIcon,
      icon: icons.RadioButtonCheckedSharpIcon,
    }
  ]
};

export default games;

