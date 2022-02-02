import { UserApiUri } from '@api-interfaces/features/enums/user-api.enum';
import {
  GetUserResponse,
  UpdateUserResponse,
  UserDetails,
} from '@api-interfaces/features/models/user-api-data.model';

import { UserDetailsForm } from '../components';
import { useAxiosGet } from '../../../core/api/hooks';
import { Loading, ErrorMessage } from '../../../shared/components';

import { UserAxiosApiService, userService } from '../../../core/api/services';
import { AxiosError, AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserContainerProps {
  userId: string;
}

export function UserContainer({ userId }: UserContainerProps) {
  const navigate = useNavigate();

  // Example using generic useAxiosGet custom hook
  /* const [response, error] = useAxiosGet<GetUserResponse>(
    UserAxiosApiService.instance.axiosInstance,
    `${UserApiUri.Users}/${userId}`
  ); */

  // Example using the userApi service.
  const [response, setResponse] = useState<GetUserResponse>();
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    handleGetUser(userId);
  }, []);

  function goToList() {
    navigate(`/users`);
  }

  function handleGetUser(userId: string) {
    userService
      .getUser(userId)
      .then((res: AxiosResponse<GetUserResponse>) => setResponse(res.data))
      .catch((err: AxiosError) => setError(err));
  }

  function handleUpdateUser(values: UserDetails) {
    userService
      .updateUser(userId, values)
      .then((res: AxiosResponse<UpdateUserResponse>) => goToList())
      .catch((err: AxiosError) => setError(err));
  }

  if (response) {
    return response.data ? (
      <UserDetailsForm
        user={response.data}
        onSubmit={handleUpdateUser}
        onCancel={goToList}
      />
    ) : (
      <Loading />
    );
  }
  return error ? <ErrorMessage message={error.message} /> : <Loading />;
}
