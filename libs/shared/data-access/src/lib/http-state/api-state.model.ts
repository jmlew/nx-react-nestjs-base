import { ApiStatus } from './api-state.enum';

export interface ApiState {
  status: ApiStatus;
  error: string | null;
}
