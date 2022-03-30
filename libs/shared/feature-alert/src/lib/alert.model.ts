import { AlertAlign, AlertType } from '@example-app/shared/ui-common';

export interface AlertConfig {
  isShown: boolean;
  message: string;
  type?: AlertType;
  align?: AlertAlign;
  duration?: number;
}
