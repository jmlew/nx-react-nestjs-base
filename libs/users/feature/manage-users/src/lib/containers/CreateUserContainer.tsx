import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAlert } from '@example-app/shared/feature-alert';
import { AlertType, Loading } from '@example-app/shared/ui-common';
import { UserDetailsForm } from '@example-app/users/ui';
import { getUserFormParams } from '@example-app/users/util';

import { useUserCreator } from '../hooks/user-creator-hook';

export function CreateUserContainer() {
  const navigate = useNavigate();
  const { setAlert } = useAlert();
  const { user, createUser, apiState, stateManager } = useUserCreator();
  const { getError, isCompleted, isFailed, isPending } = stateManager;

  useEffect(() => {
    if (isCompleted() && user != null) {
      const message = `User ${user.firstName} ${user.lastName} has been created`;
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
      <UserDetailsForm
        onSubmit={createUser}
        onCancel={goToList}
        initialValues={getUserFormParams()}
      />
    </>
  );
}
