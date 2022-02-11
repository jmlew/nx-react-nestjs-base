import { Menu } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export function Appheader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <Menu />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
          Sample App
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
