import { ApiGetUserResponse } from '@api-interfaces/models/api-req-res.model';
import { UserApiUri } from '@api-interfaces/enums/api-config.enum';

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
  /*
  Example using generic useAxiosGet custom hook
  const [response, error] = useAxiosGet<ApiGetUserResponse>(
    UserAxiosApiService.getInstance().axiosInstance,
    `${UserApiUri.Users}/${userId}`
  ); */

  // Example using the userApi service.
  const [response, setResponse] = useState<ApiGetUserResponse>();
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    userService
      .getUser(userId)
      .then((res: AxiosResponse<ApiGetUserResponse>) => {
        setResponse(res.data);
      })
      .catch((err: AxiosError) => {
        setError(err);
      });
  }, []);

  if (response) {
    return response.data ? (
      <UserDetails userId={userId} data={response.data} />
    ) : (
      <Loading />
    );
  }
  return error ? <ErrorMessage message={error.message} /> : <Loading />;
}
