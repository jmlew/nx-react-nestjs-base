import { ApiStatus, ApiRequestMethod } from '../enums/api-states.enum';

export interface ApiState {
  status: ApiStatus;
  request: ApiRequestMethod | null;
  error: string | null;
}
