import Button from '@mui/material/Button';
import { SxProps } from '@mui/system';

interface ButtonDefaultProps {
  label: string;
  onClick: () => void;
  sx?: SxProps;
}

export function ButtonDefault({ label, onClick, sx }: ButtonDefaultProps) {
  return (
    <Button variant="contained" onClick={onClick} sx={sx}>
      {label}
    </Button>
  );
}
