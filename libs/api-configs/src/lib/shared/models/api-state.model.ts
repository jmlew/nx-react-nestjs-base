import { ApiRequestType, ApiStatus } from '../enums/api-state.enum';

export interface ApiState {
  status: ApiStatus;
  request: ApiRequestType | null;
  error: string | null;
}
