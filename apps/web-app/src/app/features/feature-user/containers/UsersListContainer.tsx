import { ApiGetUserResponse } from '@api-interfaces/models/api-req-res.model';
import { UserApiUri } from '@api-interfaces/enums/api-config.enum';

import { UsersList } from '../components';
import { useAxiosGet } from '../../../core/api/hooks';
import { Loading, ErrorMessage } from '../../../shared/components';
import { userApiService } from '../../../core/api/services';

interface UserContainerProps {
  pageIndex?: string;
}

export function UsersListContainer({ pageIndex }: UserContainerProps) {
  const url = userApiService.apiBase + UserApiUri.Users;
  const params = { [UserApiUri.PageIndex]: pageIndex };

  const [response, error] = useAxiosGet<ApiGetUserResponse>(
    userApiService.instance,
    url,
    { params }
  );

  if (response) {
    return response.data ? <UsersList data={response.data} /> : <Loading />;
  }
  return error ? <ErrorMessage message={error.message} /> : <Loading />;
}
