import React, {
    createContext,
    useState,
    useEffect,
    useMemo,
    useContext
} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const ThemeModeContext = createContext({
    toggleTheme: () => { },
    darkMode: false
});

export const useThemeMode = () => {
    const context = useContext(ThemeModeContext);
    if (!context) {
        throw new Error('useThemeMode must be used within a ThemeModeProvider');
    }
    return context;
};

export const ThemeModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            document.body.classList.add('dark');
            setDarkMode(true);
        }
    }, []);

    const toggleTheme = () => {
        const isDark = document.body.classList.contains('dark');
        if (isDark) {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setDarkMode(false);
        } else {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setDarkMode(true);
        }
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode ? 'dark' : 'light',
                    primary: {
                        main: darkMode ? '#ef9848' : '#1976d2'
                    },
                    background: {
                        default: darkMode ? '#121212' : '#ffffff'
                    }
                }
            }),
        [darkMode]
    );

    return (
        <ThemeModeContext.Provider value={{ toggleTheme, darkMode }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeModeContext.Provider>
    );
};
