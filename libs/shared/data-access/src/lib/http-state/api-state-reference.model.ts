import { ApiStatus } from './api-state.enum';

export interface ApiStateReferenceManager extends ApiStateReference {
  onInit(): void;
  onPending(): void;
  onCompleted(): void;
  onFailed(error: string): void;
  onCancelled(): void;
}

export interface ApiStateReference {
  isInit(): boolean;
  isPending(): boolean;
  isCompleted(): boolean;
  isFailed(): boolean;
  wasInit(): boolean;
  wasPending(): boolean;
  wasCompleted(): boolean;
  wasFailed(): boolean;
  getStatus(): ApiStatus;
  getPrevStatus(): ApiStatus;
  getError(): string | null;
}
