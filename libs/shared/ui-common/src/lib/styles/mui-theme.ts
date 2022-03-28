import { Theme } from '@emotion/react';
import { createTheme } from '@mui/material';
import { Palette, ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#039be5',
      light: '#63ccff',
      dark: '#006db3',
    },
    secondary: {
      main: '#ffa726',
      light: '#ffd95b',
      dark: '#c77800',
    },
  },
  // Refer to the loaded font weights in src/main.tsx.
  typography: (palette: Palette) => ({
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    fontWeightLight: '300',
    fontWeightRegular: '400',
    fontWeightMedium: '500',
    fontWeightBold: '700',
  }),
};

export const uiTheme: Theme = createTheme(themeOptions);
