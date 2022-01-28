import { ApiGetUserResponse } from '@api-interfaces/models/api-req-res.model';
import { UserApiUri } from '@api-interfaces/enums/api-config.enum';

import { UserDetails } from '../components';
import { useAxiosGet } from '../../../core/api/hooks';
import { Loading, ErrorMessage } from '../../../shared/components';
import { userApiService } from '../../../core/api/services';

interface UserContainerProps {
  userId?: string;
}

export function UserContainer({ userId }: UserContainerProps) {
  const url = userApiService.apiBase + `${UserApiUri.Users}/${userId}`;

  const [response, error] = useAxiosGet<ApiGetUserResponse>(userApiService.instance, url);

  if (response) {
    return response.data ? <UserDetails data={response.data} /> : <Loading />;
  }
  return error ? <ErrorMessage message={error.message} /> : <Loading />;
}
