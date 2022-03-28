import { Context, createContext, useContext } from 'react';

import { AlertConfig } from './alert.model';

export interface AlertContextValue {
  alert: AlertConfig;
  setAlert: (alert: AlertConfig) => void;
}

export const AlertContext: Context<AlertContextValue> = createContext<AlertContextValue>(
  {} as AlertContextValue
);

export function useAlert(): AlertContextValue {
  return useContext(AlertContext);
}
