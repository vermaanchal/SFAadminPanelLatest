import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import 'simplebar/src/simplebar.css';

import { Provider as ReduxProvider } from 'react-redux';

import 'assets/third-party/apex-chart.css';

import App from './App';
import { store } from 'store';
import reportWebVitals from './reportWebVitals';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeModeProvider } from 'themes/ThemeModeProvider';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeModeProvider>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeModeProvider>
    </ReduxProvider>
  </StrictMode>
);

reportWebVitals();
