import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import AppRoot from './app/app-root/AppRoot';

// Import MUI default Roboto font: https://mui.com/components/typography/#general
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
  document.getElementById('root')
);
