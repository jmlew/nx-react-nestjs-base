import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAlert } from '@example-app/shared/feature-alert';
import { AlertType, Loading } from '@example-app/shared/ui-common';
import { UserDetailsForm } from '@example-app/users/ui';
import { getUserFormParams } from '@example-app/users/util';

import { useUserUpdater } from '../hooks/user-updater.hook';

export function UpdateUserContainer() {
  const navigate = useNavigate();
  const { setAlert } = useAlert();
  const { user, updateUser, apiState, stateManager } = useUserUpdater();
  const { getError, isCompleted, isFailed, isPending } = stateManager;

  useEffect(() => {
    if (isCompleted() && user != null) {
      const userId: number = user.id;
      const message = `User ${userId} has been updated`;
      setAlert({ isShown: true, message, type: AlertType.Success });
      goToList();
    }
    if (isFailed()) {
      const message = getError() || 'Update failed';
      setAlert({ isShown: true, message });
    }
  }, [apiState, user]);

  function goToList() {
    navigate(`/users`);
  }

  return (
    <>
      {isPending() && <Loading />}
      {
        <UserDetailsForm
          user={user}
          onSubmit={updateUser}
          onCancel={goToList}
          initialValues={getUserFormParams(user)}
        />
      }
    </>
  );
}
