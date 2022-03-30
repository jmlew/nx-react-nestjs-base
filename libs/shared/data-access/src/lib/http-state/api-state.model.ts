import { ApiRequestType, ApiStatus } from './api-state.enum';

export interface ApiState {
  status: ApiStatus;
  request: ApiRequestType | null;
  error: string | null;
}
