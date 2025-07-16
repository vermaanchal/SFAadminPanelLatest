import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';

const icons = {
  PriceChangeOutlinedIcon,
  AccountBalanceOutlinedIcon,
  AttachMoneyOutlinedIcon,
  EmojiEventsOutlinedIcon
};

const updateCoins = {
  id: 'update-coins',
  title: 'Coin / Bean Management',
  type: 'group',
  icon: icons.PriceChangeOutlinedIcon,
  children: [
    {
      id: 'add-deduct-coins',
      title: 'Add/Deduct Coins',
      type: 'item',
      url: '/UpdateUserCoin',
      icon: icons.AttachMoneyOutlinedIcon
    },
    {
      id: 'add-deduct-beans',
      title: 'Add/Deduct Beans',
      type: 'item',
      url: '/BeanTransferView',
      icon: icons.EmojiEventsOutlinedIcon
    }
  ]
};

export default updateCoins;
