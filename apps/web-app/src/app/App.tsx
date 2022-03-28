import { BrowserRouter as Router } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import AppRoutes from './app.routes';

function App() {
  return (
    <CssBaseline>
      <Router>
        <AppRoutes />
      </Router>
    </CssBaseline>
  );
}

export default App;
