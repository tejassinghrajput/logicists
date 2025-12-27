import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { APP_CONFIG } from '../config/app';

interface AppRouterProps {
  children: React.ReactNode;
}

export const AppRouter: React.FC<AppRouterProps> = ({ children }) => {
  // Debug log to help verify configuration in the browser console
  React.useEffect(() => {
    console.log(
      '%c[Router Config]', 'color: #0ea5e9; font-weight: bold;', 
      APP_CONFIG.ENABLE_ROUTING 
        ? 'Using BrowserRouter (URL updates enabled)' 
        : 'Using MemoryRouter (URL updates disabled)'
    );
  }, []);

  if (APP_CONFIG.ENABLE_ROUTING) {
    return <BrowserRouter>{children}</BrowserRouter>;
  }
  
  return <MemoryRouter>{children}</MemoryRouter>;
};