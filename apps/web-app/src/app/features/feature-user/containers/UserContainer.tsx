import { UserApiUri } from '@api-interfaces/features/enums/user-api-config.enum';
import {
  GetUserResponse,
  GetUsersResponse,
  User,
} from '@api-interfaces/features/models/user-api-data.model';

import { UserDetails } from '../components';
import { useAxiosGet } from '../../../core/api/hooks';
import { Loading, ErrorMessage } from '../../../shared/components';

import { UserAxiosApiService, userService } from '../../../core/api/services';
import { AxiosError, AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';

interface UserContainerProps {
  userId: string;
}

export function UserContainer({ userId }: UserContainerProps) {
  // Example using the userApi service.
  const [response, setResponse] = useState<GetUserResponse>();
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    userService
      .getUser(userId)
      .then((res: AxiosResponse<GetUserResponse>) => {
        setResponse(res.data);
      })
      .catch((err: AxiosError) => {
        setError(err);
      });
  }, []);

  // Example using generic useAxiosGet custom hook
  /* const [response, error] = useAxiosGet<GetUserResponse>(
    UserAxiosApiService.instance.axiosInstance,
    `${UserApiUri.Users}/${userId}`
  ); */

  if (response) {
    return response.data ? (
      <UserDetails userId={userId} data={response.data} />
    ) : (
      <Loading />
    );
  }
  return error ? <ErrorMessage message={error.message} /> : <Loading />;
}
