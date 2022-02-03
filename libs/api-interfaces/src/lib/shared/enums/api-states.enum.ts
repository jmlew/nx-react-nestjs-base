/**
 * State flags to provide progress status.
 */
export enum ApiStatus {
  Idle = 'Idle', // process not started yet
  Pending = 'Pending', // currently in progress
  Completed = 'Completed', // process completed
  Cancelled = 'Cancelled', // aborted due to cancelation
  Failed = 'Failed', // aborted due to failure
}

/**
 * HTTP CRUD request methods.
 */
export enum ApiRequest {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}
