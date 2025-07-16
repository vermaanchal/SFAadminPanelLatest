import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import DrawerHeaderStyled from './DrawerHeaderStyled';
import logo from 'assets/images/users/sfaLogo.png';

const DrawerHeader = ({ open }) => {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled theme={theme} open={open} style={{ paddingLeft: "0px" }}>
      <Stack spacing={1} alignItems="center" justifyContent="center">
        <Link to="/dashboard">
          <img alt="logo" src={logo} width="68px" />
        </Link>
      </Stack>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
