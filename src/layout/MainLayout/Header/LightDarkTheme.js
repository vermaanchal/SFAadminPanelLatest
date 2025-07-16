import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useThemeMode } from 'themes/ThemeModeProvider'; // adjust path as needed

const LightDarkTheme = ({ hidden = true }) => {
    const { darkMode, toggleTheme } = useThemeMode();

    if (hidden) return null;

    return (
        <div style={{ marginRight: '1.5rem' }}>
            <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                <IconButton onClick={toggleTheme} color="inherit">
                    {darkMode ? (
                        <LightModeOutlinedIcon sx={{ fontSize: 22, color: '#EF9848' }} />
                    ) : (
                        <DarkModeOutlinedIcon sx={{ fontSize: 22, color: '#333' }} />
                    )}
                </IconButton>
            </Tooltip>
        </div>
    );
};

export default LightDarkTheme;
