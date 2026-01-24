import React from 'react';
import ReactDOM from 'react-dom/client';
import LogRocket from 'logrocket';
import { Router } from './Router';
import './globals.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { GamificationProvider } from './contexts/GamificationContext';

LogRocket.init('g2noug/pobre-lingo');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <GamificationProvider>
        <Router />
      </GamificationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
