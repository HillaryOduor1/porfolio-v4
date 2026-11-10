import React, { createContext, useState, useEffect } from 'react';
import { THEME_KEY, THEMES, type Theme, type ThemeContextType } from './themes.types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme;
    if (savedTheme === THEMES.LIGHT || savedTheme === THEMES.DARK) {
      return savedTheme;
    }
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? THEMES.DARK : THEMES.LIGHT;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(THEME_KEY)) {
        setTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
      }
    };

    // ES5 / Legacy Browser Fallback for MediaQueryList
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else if (mediaQuery.addListener) {
      // Deprecated but necessary for older Safari/WebViews
      mediaQuery.addListener(handleSystemThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    const root = document.documentElement;
    const body = document.body;
    
    // ES5 safe query selector (no optional chaining)
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (theme === THEMES.DARK) {
      root.classList.add(THEMES.DARK);
      body.classList.add(THEMES.DARK);
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#1e1e1e');
      }
    } else {
      root.classList.remove(THEMES.DARK);
      body.classList.remove(THEMES.DARK);
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#ffffff');
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
  };

  const setThemeDirectly = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  // Using React.createElement for strict ES5 compatibility without relying on JSX transpilation
  return React.createElement(
    ThemeContext.Provider,
    { value: { theme, toggleTheme, setTheme: setThemeDirectly } },
    children
  );
};

export { ThemeContext };