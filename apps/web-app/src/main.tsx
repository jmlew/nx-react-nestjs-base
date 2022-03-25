// Import MUI default Inter font: https://mui.com/components/typography/#general
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import AppRoot from './app/app-root/AppRoot';

ReactDOM.render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
  document.getElementById('root')
);
