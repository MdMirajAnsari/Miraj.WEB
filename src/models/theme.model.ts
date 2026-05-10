export type Theme = 'dark' | 'light' | 'glass';

export interface ThemeProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}
