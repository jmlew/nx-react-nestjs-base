import { ApiStatus } from './api-state.enum';
import { ApiState } from './api-state.model';

/**
 * State machine which manages the state of API requests based on events.
 * Includes methods which return new API State objects or mutable versions which require
 * the current state object as an argument.
 */

export class ApiStateManager {
  static onInit(): ApiState {
    return {
      status: ApiStatus.Init,
      error: null,
    };
  }

  static onPending(): ApiState {
    return {
      status: ApiStatus.Pending,
      error: null,
    };
  }

  static onCompleted(): ApiState {
    return {
      status: ApiStatus.Completed,
      error: null,
    };
  }

  static onFailed(error: string): ApiState {
    return {
      status: ApiStatus.Failed,
      error,
    };
  }

  static onCancelled(): ApiState {
    return {
      status: ApiStatus.Cancelled,
      error: null,
    };
  }

  /**
   * Versions which mutate the current state instead of returning a new state object.
   * Useful for the RTK createReducer functions which require mutating the current state.
   */

  static onPendingMutable(state: ApiState): void {
    state.status = ApiStatus.Pending;
    state.error = null;
  }

  static onCompletedMutable(state: ApiState): void {
    state.status = ApiStatus.Completed;
    state.error = null;
  }

  static onFailedMutable(state: ApiState, error: string): void {
    state.status = ApiStatus.Failed;
    state.error = error;
  }

  static onCancelledMutable(state: ApiState): void {
    state.status = ApiStatus.Cancelled;
    state.error = null;
  }

  static isInit(state: ApiState): boolean {
    return state.status === ApiStatus.Init;
  }

  static isPending(state: ApiState): boolean {
    return state.status === ApiStatus.Pending;
  }

  static isCompleted(state: ApiState): boolean {
    return state.status === ApiStatus.Completed;
  }

  static isFailed(state: ApiState): boolean {
    return state.status === ApiStatus.Failed;
  }

  static getStatus(state: ApiState): ApiStatus {
    return state.status;
  }

  static getError(state: ApiState): string | null {
    return state.error;
  }
}
