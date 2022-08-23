import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '1rem',
  },
};

export function AppHome() {
  const navigate = useNavigate();
  const handleSampleClick = () => {
    navigate('/users');
  };

  return (
    <Box sx={styles.root}>
      <h1>Home Component</h1>
      <Button variant="contained" onClick={handleSampleClick}>
        Go to Sample Feature
      </Button>
    </Box>
  );
}
