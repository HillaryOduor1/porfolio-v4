/*import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create a separate hook file or move this to a different file
// For now, we'll disable the ESLint rule for this line
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};*/
/*last stable
import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { THEME_KEY, THEMES, type Theme, type ThemeContextType } from './themes.types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(THEMES.LIGHT);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === THEMES.LIGHT || savedTheme === THEMES.DARK) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme(THEMES.DARK);
    }
  }, []);

  // Listen for system theme changes (only when no saved theme exists)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(THEME_KEY)) {
        setTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Apply theme to <html> and <body> + save to localStorage
  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);

    const root = document.documentElement;
    const body = document.body;

    if (theme === THEMES.DARK) {
      root.classList.add(THEMES.DARK);
      body.classList.add(THEMES.DARK);
    } else {
      root.classList.remove(THEMES.DARK);
      body.classList.remove(THEMES.DARK);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme =>
      prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    );
  };

  const setThemeDirectly = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setThemeDirectly }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };*/
import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { THEME_KEY, THEMES, type Theme, type ThemeContextType } from './themes.types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme;
    if (savedTheme === THEMES.LIGHT || savedTheme === THEMES.DARK) {
      return savedTheme;
    }
    
    // Default to system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? THEMES.DARK : THEMES.LIGHT;
  });

  // Listen for system theme changes (only when no saved theme exists)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a theme
      if (!localStorage.getItem(THEME_KEY)) {
        setTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Apply theme to <html> and <body> + save to localStorage
  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);

    const root = document.documentElement;
    const body = document.body;

    if (theme === THEMES.DARK) {
      root.classList.add(THEMES.DARK);
      body.classList.add(THEMES.DARK);
    } else {
      root.classList.remove(THEMES.DARK);
      body.classList.remove(THEMES.DARK);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme =>
      prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    );
  };

  const setThemeDirectly = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setThemeDirectly }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
