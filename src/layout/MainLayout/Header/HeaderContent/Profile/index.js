import * as React from 'react';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Stack
} from '@mui/material';

import Logout from '@mui/icons-material/Logout';
import SyncLockOutlinedIcon from '@mui/icons-material/SyncLockOutlined';
import { toast, ToastContainer } from 'react-toastify';
import { baseURLProd } from 'api/api';
import { useState } from 'react';

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('uservalue');
    localStorage.removeItem('assignId');
    window.location.assign('/');
  };

  const handlePasswordSubmit = async () => {
    try {
      const req = await fetch(`${baseURLProd}ChangePassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminId: '123456',
          currentPassword,
          newPassword
        })
      });
      const res = await req.json();

      if (res.status === true) {
        toast.success('Password changed successfully');
        setPasswordOpen(false);
        setCurrentPassword('');
        setNewPassword('');
      } else {
        alert(res.errorMessage || 'Incorrect current password');
      }
    } catch (error) {
      console.error('Change password error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <>
      <ToastContainer />
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', gap: '2rem', mr: "1.5rem" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2, p: 0 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Avatar sx={{ width: 25, height: 25, bgcolor: '#F17A45', fontSize: "0.95rem" }}>A</Avatar>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: "0.85rem" }}>
                Admin
              </Typography>
            </Stack>
          </IconButton>
        </Tooltip>
      </Box>


      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Avatar style={{ width: "1.8rem", height: "1.8rem", backgroundColor: '#F17A45', fontSize: "1rem" }}>A</Avatar>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: "0.85rem" }}>
              Admin
            </Typography>
          </Stack>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setPasswordOpen(true)}>
          <ListItemIcon>
            <SyncLockOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Change Password
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Dialog open={passwordOpen} onClose={() => setPasswordOpen(false)}>
        <DialogTitle className="editTitle">Change Password</DialogTitle>
        <DialogContent>
          <Grid className="changepassinnerdiv my-4">
            <Grid item>
              <TextField
                margin="dense"
                label="Current Password"
                type="password"
                fullWidth
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="editInputField"
              />
              <TextField
                margin="dense"
                label="New Password"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="editInputField"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="editButtonDiv">
          <Button
            onClick={() => setPasswordOpen(false)}
            className="btn btn-primary"
            style={{ backgroundColor: '#F17A45', border: '0px' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePasswordSubmit}
            className="btn btn-primary"
            style={{ backgroundColor: '#F17A45', border: '0px' }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
