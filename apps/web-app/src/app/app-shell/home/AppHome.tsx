import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import * as styles from './styles';

export function AppHome() {
  const navigate = useNavigate();
  const handleSampleClick = () => {
    navigate('users');
  };

  return (
    <Box sx={styles.appHome}>
      <h1>Home Component</h1>
      <Button variant="contained" onClick={handleSampleClick}>
        Go to Sample Feature
      </Button>
    </Box>
  );
}
