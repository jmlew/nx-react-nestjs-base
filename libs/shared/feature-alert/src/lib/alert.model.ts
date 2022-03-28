import { AlertAlign, AlertType } from '@example-app/shared/ui-alert';

export interface AlertConfig {
  isShown: boolean;
  message: string;
  type?: AlertType;
  align?: AlertAlign;
  duration?: number;
}
