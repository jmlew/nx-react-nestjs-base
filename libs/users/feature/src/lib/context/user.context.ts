import { Context, createContext, useContext } from 'react';

import { User } from '@example-app/users/domain';

export interface UserContextValue {
  user: User;
}

export const UserContext: Context<UserContextValue> = createContext(
  {} as UserContextValue
);

export function useUserContext(): UserContextValue {
  const context: UserContextValue = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
}
