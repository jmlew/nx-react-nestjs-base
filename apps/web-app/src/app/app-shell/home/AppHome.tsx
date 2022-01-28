import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

import { ButtonDefault } from '../../shared/components';

import * as styles from './styles';

export function AppHome() {
  const navigate = useNavigate();
  const handleSampleClick = () => {
    navigate('users');
  };
  return (
    <Box sx={styles.appHome}>
      <h1>Home Component</h1>
      <ButtonDefault
        label="Go to Sample Feature"
        onClick={handleSampleClick}
        sx={styles.homeButton}
      />
    </Box>
  );
}
