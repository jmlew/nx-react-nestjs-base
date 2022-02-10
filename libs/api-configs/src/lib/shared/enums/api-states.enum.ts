/**
 * State flags to provide progress status.
 */
export enum ApiStatus {
  Init = 'Init', // process not started yet
  Pending = 'Pending', // currently in progress
  Completed = 'Completed', // process completed
  Cancelled = 'Cancelled', // aborted due to cancelation
  Failed = 'Failed', // aborted due to failure
}

/**
 * HTTP CRUD request methods.
 */
export enum ApiRequestMethod {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}
