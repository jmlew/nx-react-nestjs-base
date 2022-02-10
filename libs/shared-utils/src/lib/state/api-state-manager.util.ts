import {
  ApiRequestMethod,
  ApiStatus,
} from '@api-interfaces/shared/enums/api-states.enum';
import { ApiState } from '@api-interfaces/shared/models/api-states.model';

/**
 * State manager which returns a new ApiState object based on certain API states.
 */

export class ApiStateManager {
  static onInit(): ApiState {
    return {
      status: ApiStatus.Init,
      request: null,
      error: null,
    };
  }

  static onPending(request: ApiRequestMethod): ApiState {
    return {
      request,
      status: ApiStatus.Pending,
      error: null,
    };
  }

  static onCompleted(request: ApiRequestMethod): ApiState {
    return {
      request,
      status: ApiStatus.Completed,
      error: null,
    };
  }

  static onFailed(error: string, request: ApiRequestMethod): ApiState {
    return {
      request,
      status: ApiStatus.Failed,
      error,
    };
  }

  static onCancelled(request: ApiRequestMethod): ApiState {
    return {
      request,
      status: ApiStatus.Cancelled,
      error: null,
    };
  }

  /**
   * Versions which mutate the current state instead of returning a new state object.
   * Useful for the RTK createReducer functions which require mutating the current state.
   */

  static onPendingMutable(state: ApiState, request: ApiRequestMethod): void {
    state.status = ApiStatus.Pending;
    state.request = request;
    state.error = null;
  }

  static onCompletedMutable(state: ApiState, request: ApiRequestMethod): void {
    state.status = ApiStatus.Completed;
    state.request = request;
    state.error = null;
  }

  static onFailedMutable(
    state: ApiState,
    error: string,
    request: ApiRequestMethod
  ): void {
    state.status = ApiStatus.Failed;
    state.request = request;
    state.error = error;
  }

  static onCancelledMutable(state: ApiState, request: ApiRequestMethod): void {
    state.status = ApiStatus.Cancelled;
    state.request = request;
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

  static isCreate(state: ApiState): boolean {
    return state.request === ApiRequestMethod.Create;
  }

  static isRead(state: ApiState): boolean {
    return state.request === ApiRequestMethod.Read;
  }

  static isUpdate(state: ApiState): boolean {
    return state.request === ApiRequestMethod.Update;
  }

  static isDelete(state: ApiState): boolean {
    return state.request === ApiRequestMethod.Delete;
  }

  static getStatus(state: ApiState): ApiStatus {
    return state.status;
  }

  static getRequest(state: ApiState): ApiRequestMethod | null {
    return state.request;
  }

  static getError(state: ApiState): string | null {
    return state.error;
  }
}
