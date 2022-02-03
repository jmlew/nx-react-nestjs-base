import { ApiStatus, ApiRequest } from '../enums/api-states.enum';

export interface ApiState {
  status: ApiStatus;
  request: ApiRequest;
  error: string | null;
}
