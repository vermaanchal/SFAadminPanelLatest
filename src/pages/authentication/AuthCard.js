import PropTypes from 'prop-types';

// material-ui
import { Box } from '@mui/material';

// project import
// import MainCard from 'components/MainCard';

// ==============================|| AUTHENTICATION - CARD WRAPPER ||============================== //

const AuthCard = ({ children, ...other }) => (
  <div

    // sx={{
    //   // maxWidth: { xs: 400, lg: 475 },
    //   padding: { xs: 2.5, md: 3 },
    //   margin: '0px',
    //   '& > *': {
    //     flexGrow: 1,
    //     flexBasis: '50%'
    //   }
    // }}
    content={false}
    {...other}
    border={false}
    // boxShadow
  >
     <Box sx={{ p: { xs: 2, sm: 3, md: 5, xl: 6 } }}>{children}</Box>
    {/* <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }} style={{padding:"51px 10px"}}>{children}</Box> */}
  </div>
);

AuthCard.propTypes = {
  children: PropTypes.node
};

export default AuthCard;
