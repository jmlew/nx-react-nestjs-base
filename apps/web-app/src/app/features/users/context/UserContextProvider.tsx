import React, { useMemo } from 'react';

import { User } from '@api-configs/features/models/user-api-data.model';

import { UserContext, UserContextValue } from './user.context';

interface UserContextProviderProps {
  user: User;
  children: React.ReactNode;
}

export function UserContextProvider({ user, children }: UserContextProviderProps) {
  const value: UserContextValue = useMemo(() => ({ user }), [user]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
