import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from './Router';
import './globals.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { GamificationProvider } from './contexts/GamificationContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <GamificationProvider>
        <Router />
      </GamificationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
