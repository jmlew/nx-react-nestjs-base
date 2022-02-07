import { ReactNode, useState } from 'react';
import { AlertContainer } from '.';
import { AlertContext } from '../context';
import { AlertConfig } from '../models/alert.model';

interface AlertProviderProps {
  children: ReactNode;
}

export function AlertProvider({ children }: AlertProviderProps) {
  const alertConfig: AlertConfig = {
    isShown: false,
    message: '',
  };

  const [alert, setAlert] = useState(alertConfig);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      <AlertContainer />
      {children}
    </AlertContext.Provider>
  );
}
