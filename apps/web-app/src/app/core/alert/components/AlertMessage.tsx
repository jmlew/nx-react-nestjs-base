import { Alert, Snackbar, SnackbarCloseReason, SnackbarOrigin } from '@mui/material';
import { SyntheticEvent } from 'react';
import { AlertAlign, AlertType } from '../enums/alert.enum';
import { getAlignment, getAlignmentByType } from '../utils';

interface AlertMessageProps {
  message: string;
  isShown: boolean;
  onClose: () => void;
  type?: AlertType;
  align?: AlertAlign;
  duration?: number;
}

export function AlertMessage({
  message,
  isShown,
  onClose,
  type,
  duration,
  align,
}: AlertMessageProps) {
  const severity: AlertType = type || AlertType.Error;
  const anchorOrigin: SnackbarOrigin =
    align != null ? getAlignment(align) : getAlignmentByType(severity);
  function handleClose(event: SyntheticEvent, reason?: SnackbarCloseReason) {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  }
  return (
    <Snackbar
      open={isShown}
      autoHideDuration={duration || 3000}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
