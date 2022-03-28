import { AlertAlign, AlertType } from '@example-app/alert/ui';

export interface AlertConfig {
  isShown: boolean;
  message: string;
  type?: AlertType;
  align?: AlertAlign;
  duration?: number;
}
