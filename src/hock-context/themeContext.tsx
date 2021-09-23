import { useEffect, useState, createContext, ReactNode } from 'react';


enum ThemeColor {
  "default",
  "warm",
  "dark",
  "tonic",
  "rainy"
}
type ThemeColorNameList = keyof typeof ThemeColor;

interface IThemeProviderProps {
  children: ReactNode
}

interface IThemeContext {
  theme: ThemeColorNameList,
  setTheme: (theme: ThemeColorNameList) => void
}


const STORAGE_NAME_THEME_COLOR: string = process.env.REACT_APP_STORAGE_NAME_THEME_COLOR || "color";


const getInitialTheme = (): ThemeColorNameList => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs: string | null = window.localStorage.getItem(STORAGE_NAME_THEME_COLOR);
    
    if (!storedPrefs) {
      window.localStorage.setItem(STORAGE_NAME_THEME_COLOR, 'default');
      return 'default';
    }
    
    return storedPrefs as ThemeColorNameList;
  }
  
  return 'default';
};


export const ThemeContext = createContext<IThemeContext | null>(null);

export const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const [ theme, setTheme ] = useState(getInitialTheme);
  
  useEffect(() => {
    rawSetTheme(theme);
  }, [ theme ]);
  
  const rawSetTheme = (rawTheme: ThemeColorNameList): void => {
    const getThemeSwitcher = document.body;
    // data-theme custom attribute for switching skins. Is in index.html <body data-theme="default">
    getThemeSwitcher.setAttribute("data-theme", rawTheme);
    
    localStorage.setItem(STORAGE_NAME_THEME_COLOR, rawTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      { children }
    </ThemeContext.Provider>
  );
};
