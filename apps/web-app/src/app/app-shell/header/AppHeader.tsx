import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Menu } from '@mui/icons-material';

import * as styles from './styles';

export function Appheader() {
  // return <Box sx={styles.appHeader}>App Header Component</Box>;
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <Menu />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          App Header
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
