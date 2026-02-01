import React from 'react';
import ReactDOM from 'react-dom/client';
import LogRocket from 'logrocket';
import { Router } from './Router';
import { HelmetProvider } from 'react-helmet-async';
import './globals.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { GamificationProvider } from './contexts/GamificationContext';

LogRocket.init('g2noug/pobre-lingo');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <GamificationProvider>
        <HelmetProvider>
          <Router />
        </HelmetProvider>
      </GamificationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
