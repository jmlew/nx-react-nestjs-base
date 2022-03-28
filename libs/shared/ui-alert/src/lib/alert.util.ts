import { SnackbarOrigin } from '@mui/material';

import { AlertAlign, AlertType } from './alert.enum';

export function getAlignmentByType(type: AlertType): SnackbarOrigin {
  switch (type) {
    case AlertType.Error:
      return getAlignment(AlertAlign.TopCenter);
    case AlertType.Success:
      return getAlignment(AlertAlign.TopCenter);
    case AlertType.Warning:
      return getAlignment(AlertAlign.TopCenter);
    case AlertType.Info:
    default:
      return getAlignment(AlertAlign.BottomCenter);
  }
}

export function getAlignment(align: AlertAlign): SnackbarOrigin {
  switch (align) {
    case AlertAlign.TopCenter:
      return {
        vertical: 'top',
        horizontal: 'center',
      };
    case AlertAlign.BottomCenter:
    default:
      return {
        vertical: 'bottom',
        horizontal: 'center',
      };
  }
}
