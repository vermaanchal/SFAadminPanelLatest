import MainCard from 'components/MainCard';
// import { Select, MenuItem, InputLabel } from '@material-ui/core';
import { Select, MenuItem, InputLabel, FormControl,
  // Chip,Box,Checkbox,ListItemText 
  } from '@mui/material';

import AddDesignationHook from './AddDesignationHook';
import { ToastContainer } from 'react-toastify';
const AddDesignation = () => {
  const { role, features, handleSelectChange, roleId, featureId, handlefeatureSelectChange, handleCreateDesignation } = AddDesignationHook()

  return (
    <MainCard title="Add Designation">
      <div className='row'>
        <div className='col text-center'>
          <ToastContainer />
          <FormControl className='designationForm mt-2'>
            <InputLabel id="select-label">Select Role</InputLabel>
            <Select
              labelId="select-label"
              label='Select Role'
              id="select"
              value={roleId}
              onChange={handleSelectChange}
              className='selectDiv'
            >
              <MenuItem>Select Role</MenuItem>
              {role.map((option) => (
                <MenuItem key={option.roleId} value={option.roleName}>
                  {option.roleName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='col text-center'>
          <FormControl className='designationForm mt-2' style={{ width: "100%" }}>
            <InputLabel id="select-label">Select Feature</InputLabel>
            <Select
              labelId="Select Feature"
              id="select"
              multiple
              value={featureId}
              onChange={handlefeatureSelectChange}
              className='selectDiv2'
              // renderValue={(selected) => {
              //   console.log(selected,'dddd')
              //   return(
              //   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              //     {selected.map((value) => (
              //       <Chip key={value} label={value} sx={{ margin: '2px' }} />
              //     ))}
              //   </Box>
              //   )
              // }
              // }
            >
              {features.map((option) => (
                <MenuItem key={option.featureId} value={option.featureId}>
                  {/* <Checkbox checked={featureId.indexOf(option.featureName) > -1} /> */}
                  {/* <ListItemText primary={option.featureName} /> */}
                  {option.featureName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='col text-center'>
          <button className='btn btn-primary me-2'
            onClick={() => handleCreateDesignation()}
            style={{ backgroundColor: '#EF9848', border: '0px', padding: "8px" }}>Submit</button>
        </div>
      </div>
    </MainCard>
  );
}

export default AddDesignation;
