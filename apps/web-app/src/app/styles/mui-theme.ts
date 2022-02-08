import { Theme } from '@emotion/react';
import { createTheme } from '@mui/material';
import { ThemeOptions } from '@mui/material/styles';

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
};

export const uiTheme: Theme = createTheme(themeOptions);
