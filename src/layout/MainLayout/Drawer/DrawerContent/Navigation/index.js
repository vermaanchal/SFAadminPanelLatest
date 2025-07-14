// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import React from 'react';
// import { baseURLProd } from 'api/api';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  // const [data, setData] = React.useState([]);

  // const fetchData = async () => {
  //   const assignid = localStorage.getItem('assignId')
  //   const uservalue = localStorage.getItem('uservalue')
  //   try {
  //     let req = await fetch(`${baseURLProd}AssignPages`, {
  //       method: "POST",
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         loginId: uservalue,
  //         assignId: assignid
  //       }),
  //     });

  //     const res = await req.json();
  //     setData(res.assignPagesList);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchData()
  // }, [])
  const navGroups = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            
            {/* Fix - Navigation Group */}
               </Typography>
       
        );
    }
  });

  return <Box sx={{ pt: 0 }}>{navGroups}</Box>;
};

export default Navigation;
