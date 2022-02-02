import { UserApiUri, UserApiParam } from '@api-interfaces/features/enums/user-api.enum';
import { GetUsersResponse } from '@api-interfaces/features/models/user-api-data.model';

import { UsersList } from '../components';
import { useAxiosGet } from '../../../core/api/hooks';
import { Loading, ErrorMessage } from '../../../shared/components';
import { UserAxiosApiService, userService } from '../../../core/api/services';
import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

interface UserContainerProps {
  pageIndex: string | null;
}

export function UsersListContainer({ pageIndex }: UserContainerProps) {
  const navigate = useNavigate();

  // Example using generic useAxiosGet custom hook
  /* const params = { [UserApiParam.Page]: pageIndex };
  const [response, error] = useAxiosGet<GetUsersResponse>(
    UserAxiosApiService.instance.axiosInstance,
    UserApiUri.Users,
    { params }
  ); */

  // Example using the userApi service.
  const [response, setResponse] = useState<GetUsersResponse>();
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    const page: number = pageIndex == null ? 1 : parseInt(pageIndex, 10);
    userService
      .getUsers(page)
      .then((res: AxiosResponse<GetUsersResponse>) => setResponse(res.data))
      .catch((err: AxiosError) => setError(err));
  }, [pageIndex]);

  function handleEditUser(userId: number) {
    navigate(`${userId}`);
  }

  if (response) {
    return response.data ? (
      <UsersList users={response.data} onEditUser={handleEditUser} />
    ) : (
      <Loading />
    );
  }
  return error ? <ErrorMessage message={error.message} /> : <Loading />;
}
