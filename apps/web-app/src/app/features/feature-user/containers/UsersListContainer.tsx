import { ApiGetUsersResponse } from '@api-interfaces/models/api-req-res.model';
import { UserApiUri } from '@api-interfaces/enums/api-config.enum';

import { UsersList } from '../components';
import { useAxiosGet } from '../../../core/api/hooks';
import { Loading, ErrorMessage } from '../../../shared/components';
import { UserAxiosApiService, userService } from '../../../core/api/services';
import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';

interface UserContainerProps {
  pageIndex: string | null;
}

export function UsersListContainer({ pageIndex }: UserContainerProps) {
  /*
  Example using generic useAxiosGet custom hook
  const [response, error] = useAxiosGet<ApiGetUsersResponse>(
    UserAxiosApiService.getInstance().axiosInstance,
    UserApiUri.Users,
    { params }
  ); */

  // Example using the userApi service.
  const [response, setResponse] = useState<ApiGetUsersResponse>();
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    const page: number = pageIndex == null ? 1 : parseInt(pageIndex, 10);
    userService
      .getUsers(page)
      .then((res: AxiosResponse<ApiGetUsersResponse>) => {
        setResponse(res.data);
      })
      .catch((err: AxiosError) => {
        setError(err);
      });
  }, [pageIndex]);

  if (response) {
    return response.data ? <UsersList data={response.data} /> : <Loading />;
  }
  return error ? <ErrorMessage message={error.message} /> : <Loading />;
}
