// src/context/ThemeContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'Light Theme' | 'Dark Theme' | 'Corporate Blue' | 'Custom';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  secondaryColor: string;
  setSecondaryColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('Light Theme');
  const [primaryColor, setPrimaryColor] = useState<string>('#3B82F6');
  const [secondaryColor, setSecondaryColor] = useState<string>('#6366F1');

  useEffect(() => {
    document.documentElement.className =
      theme === 'Dark Theme' ? 'dark' : theme === 'Corporate Blue' ? 'corporate' : '';
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
  }, [theme, primaryColor, secondaryColor]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;

