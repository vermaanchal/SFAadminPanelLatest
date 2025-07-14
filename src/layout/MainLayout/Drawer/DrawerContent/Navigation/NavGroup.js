// import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';

// // material-ui
// import { Box, List, Typography } from '@mui/material';

// // project import
// import NavItem from './NavItem';

// // ==============================|| NAVIGATION - LIST GROUP ||============================== //

// const NavGroup = ({ item }) => {
//   const menu = useSelector((state) => state.menu);
//   const { drawerOpen } = menu;

//   const navCollapse = item.children?.map((menuItem) => {
//     switch (menuItem.type) {
//       case 'collapse':
//         return (
//           <Typography key={menuItem.id} variant="caption" color="error" sx={{ p: 2.5 }}>
//             collapse - only available in paid version
//           </Typography>
//         );
//       case 'item':
//         return <NavItem key={menuItem.id} item={menuItem} level={1} />;
//       default:
//         return (
//           <Typography key={menuItem.id} variant="h6" color="error" align="center">
//             Fix - Group Collapse or Items
//           </Typography>
//         );
//     }
//   });

//   return (
//     <List
//       subheader={
//         item.title &&
//         drawerOpen && (
//           <Box sx={{ pl: 3, mb: 1.5 }}>
//             <Typography variant="subtitle2" color="textSecondary">
//               {item.title}
//             </Typography>
//             {/* only available in paid version */}
//           </Box>
//         )
//       }
//       sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
//     >
//       {navCollapse}
//     </List>
//   );
// };

// NavGroup.propTypes = {
//   item: PropTypes.object
// };

// export default NavGroup;






import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  Typography
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// project import
import NavItem from './NavItem';
import { Margin, Padding } from '../../../../../../node_modules/@mui/icons-material/index';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
  const menu = useSelector((state) => state.menu);
  const { drawerOpen } = menu;

  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <Typography key={menuItem.id} variant="caption" color="error" sx={{ p: 0.2 }}>
            collapse - only available in paid version
          </Typography>
        );
      case 'item':
        return  <NavItem key={menuItem.id} item={menuItem} level={1} />
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

   const isSingleItem =
    item.children?.length === 1 && item.children[0].type === 'item';
  return (
    <List sx={{ml: isSingleItem ? '-10px' : 0,mb: drawerOpen ? 0 : 0, py: 0, zIndex: 0 }}>
       {isSingleItem ? (navCollapse) :
     ( item.title && drawerOpen && (
        <Accordion   
        sx={{
          borderRadius: 0,
          boxShadow: 'none',
          border: 'none'
        }}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon  />}
            aria-controls="panel1-content"
            id={item.title}  
          >
            <Typography component="span" >{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
              <Box sx={{ p: 0, bgcolor: 'background.paper' }}>
                {navCollapse}
              </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </List>
  );
};

// NavGroup.propTypes = {
//   item: PropTypes.object
// };

NavGroup.propTypes = {
  item: PropTypes.object.isRequired,
  expanded: PropTypes.bool,
  onChange: PropTypes.func
};

export default NavGroup;
