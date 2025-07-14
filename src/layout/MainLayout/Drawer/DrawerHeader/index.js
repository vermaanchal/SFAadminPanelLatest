import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/material';

import DrawerHeaderStyled from './DrawerHeaderStyled';
import logo from 'assets/images/users/sfaLogo.png'
import { useNavigate } from 'react-router-dom';

const DrawerHeader = ({ open }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleredirect=()=>{
    navigate('/dashboard')
  }

  return (
    <DrawerHeaderStyled theme={theme} open={open} style={{paddingLeft:"0px"}}>
      <Stack spacing={1} alignItems="center" justifyContent='center'>
        <img alt='logo' src={logo} width='68px' onClick={handleredirect}/>
      </Stack>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
