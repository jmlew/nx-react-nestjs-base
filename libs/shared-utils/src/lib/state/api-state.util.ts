import { ProgressStatus } from '@api-interfaces/shared/enums/api-states.enum';
import { ApiDataState } from '@api-interfaces/shared/models/api-states.model';

/**
 * Abstracts over each API Data state by changing the API load status and assigning error
 * messages.
 */

/**
 * Initialises the use of the API data state pattern by creating a new state object.
 */
export function onApiStateInit(): ApiDataState {
  const state: ApiDataState = {
    loadStatus: ProgressStatus.Idle,
    errorMessage: null,
  };
  return state;
}

/**
 * The following versions are immutable, and as such should not be used with the
 * RTK createReducer functions, which use ImmerJS to mutate proxy state objects and do
 * not expect new states to be returned during updates.
 */

export function onApiStateLoad(state: ApiDataState): ApiDataState {
  return {
    ...state,
    loadStatus: ProgressStatus.Pending,
    errorMessage: null,
  };
}

export function onApiStateLoadComplete(state: ApiDataState): ApiDataState {
  return {
    ...state,
    loadStatus: ProgressStatus.Completed,
    errorMessage: null,
  };
}

export function onApiStateLoadFailed(
  state: ApiDataState,
  errorMessage: string
): ApiDataState {
  return {
    ...state,
    loadStatus: ProgressStatus.Failed,
    errorMessage,
  };
}

/**
 * The following version are mutable and make inline edits to the state object, instead
 * of returning a new state, and as such should be used with the RTK createReducer
 * functions instead of core redux, which require immutability.
 */

export function onApiStateLoadMutable(state: ApiDataState): void {
  state.loadStatus = ProgressStatus.Pending;
  state.errorMessage = null;
}

export function onApiStateLoadCompleteMutable(state: ApiDataState): void {
  state.loadStatus = ProgressStatus.Completed;
  state.errorMessage = null;
}

export function onApiStateLoadFailedMutable(
  state: ApiDataState,
  errorMessage: string
): void {
  state.loadStatus = ProgressStatus.Failed;
  state.errorMessage = errorMessage;
}

/**
 * Getters for the ful state and each state property.
 */

export function getApiStateLoadStatus(state: ApiDataState): ProgressStatus {
  return state.loadStatus;
}

export function getApiStateErrorMessage(state: ApiDataState): string | null {
  return state.errorMessage;
}
