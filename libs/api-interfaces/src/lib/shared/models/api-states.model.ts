import { ProgressStatus } from '../enums/api-states.enum';

export interface ApiDataState {
  errorMessage: string | null;
  loadStatus: ProgressStatus;
  updateStatus: ProgressStatus;
}
