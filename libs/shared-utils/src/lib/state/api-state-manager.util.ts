import { ApiRequest, ApiStatus } from '@api-interfaces/shared/enums/api-states.enum';
import { ApiState } from '@api-interfaces/shared/models/api-states.model';

/**
 * State manager which returns a new ApiState object based on certain API states.
 */

export class ApiStateManager {
  static onInit(): ApiState {
    return {
      status: ApiStatus.Idle,
      request: ApiRequest.Read,
      error: null,
    };
  }

  static onPending(request: ApiRequest = ApiRequest.Read): ApiState {
    return {
      request,
      status: ApiStatus.Pending,
      error: null,
    };
  }

  static onCompleted(request: ApiRequest = ApiRequest.Read): ApiState {
    return {
      request,
      status: ApiStatus.Completed,
      error: null,
    };
  }

  static onFailed(error: string, request: ApiRequest = ApiRequest.Read): ApiState {
    return {
      request,
      status: ApiStatus.Failed,
      error,
    };
  }

  static onCancelled(request: ApiRequest = ApiRequest.Read): ApiState {
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

  static onPendingMutable(state: ApiState, request: ApiRequest = ApiRequest.Read): void {
    state.status = ApiStatus.Pending;
    state.request = request;
    state.error = null;
  }

  static onCompletedMutable(
    state: ApiState,
    request: ApiRequest = ApiRequest.Read
  ): void {
    state.status = ApiStatus.Completed;
    state.request = request;
    state.error = null;
  }

  static onFailedMutable(
    state: ApiState,
    error: string,
    request: ApiRequest = ApiRequest.Read
  ): void {
    state.status = ApiStatus.Failed;
    state.request = request;
    state.error = error;
  }

  static onCancelledMutable(
    state: ApiState,
    request: ApiRequest = ApiRequest.Read
  ): void {
    state.status = ApiStatus.Cancelled;
    state.request = request;
    state.error = null;
  }

  static isPending(state: ApiState): boolean {
    return state.status === ApiStatus.Pending;
  }

  static isIdle(state: ApiState): boolean {
    return state.status === ApiStatus.Idle;
  }

  static isCompleted(state: ApiState): boolean {
    return state.status === ApiStatus.Completed;
  }

  static isFailed(state: ApiState): boolean {
    return state.status === ApiStatus.Failed;
  }

  static isCreateReq(state: ApiState): boolean {
    return state.request === ApiRequest.Create;
  }

  static isReadReq(state: ApiState): boolean {
    return state.request === ApiRequest.Read;
  }

  static isUpdateReq(state: ApiState): boolean {
    return state.request === ApiRequest.Update;
  }

  static isDeleteReq(state: ApiState): boolean {
    return state.request === ApiRequest.Delete;
  }

  static getStatus(state: ApiState): ApiStatus {
    return state.status;
  }

  static getRequest(state: ApiState): ApiRequest {
    return state.request;
  }

  static getError(state: ApiState): string | null {
    return state.error;
  }
}
