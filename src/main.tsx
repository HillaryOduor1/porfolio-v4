import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import './index.css';

// Ensure we're running in a browser environment
if (typeof window !== 'undefined') {
  const rootElement = document.getElementById('root');
  
  if (rootElement) {
    // Check for required features
    var hasRequiredFeatures = (
      typeof Promise !== 'undefined' &&
      typeof Object.assign !== 'undefined' &&
      typeof window.fetch !== 'undefined'
    );
    
    if (!hasRequiredFeatures && (window as any).__LEGACY_BROWSER__) {
      var warningDiv = document.createElement('div');
      warningDiv.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#f44336;color:white;padding:20px;text-align:center;z-index:9999;';
      warningDiv.innerHTML = 'Your browser is outdated. Please <a href="https://browsehappy.com/" style="color:white;text-decoration:underline;">update your browser</a> for the best experience.';
      document.body.insertBefore(warningDiv, document.body.firstChild);
    }
    
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </React.StrictMode>
    );
  }
}
/*
import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import './index.css';

// Ensure we're running in a browser environment
if (typeof window !== 'undefined') {
  const rootElement = document.getElementById('root');
  
  if (rootElement) {
    // Check for required features
    const hasRequiredFeatures = (
      typeof Promise !== 'undefined' &&
      typeof Object.assign !== 'undefined' &&
      typeof window.fetch !== 'undefined'
    );
    
    if (!hasRequiredFeatures && (window as any).__LEGACY_BROWSER__) {
      const warningDiv = document.createElement('div');
      warningDiv.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#f44336;color:white;padding:20px;text-align:center;z-index:9999;';
      warningDiv.innerHTML = 'Your browser is outdated. Please <a href="https://browsehappy.com/" style="color:white;text-decoration:underline;">update your browser</a> for the best experience.';
      document.body.insertBefore(warningDiv, document.body.firstChild);
    }
    
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <BrowserRouter>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </React.StrictMode>
    );
  }
}*/