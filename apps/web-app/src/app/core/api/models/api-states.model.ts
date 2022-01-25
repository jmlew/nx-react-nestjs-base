import { ProgressStatus } from '../enums/api-states.enum';

export interface ApiDataState {
  errorMessage: string | null;
  loadStatus: ProgressStatus;

  // Useful for apps which distinguish load with updates to API data.
  // updateStatus: ProgressStatus;
}
