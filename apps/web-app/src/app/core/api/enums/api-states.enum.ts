/**
 * State flags to provide progress status.
 */
export enum ProgressStatus {
  Idle = 'idle', // process not started yet
  Pending = 'pending', // currently in progress
  Completed = 'completed', // process completed
  Cancelled = 'cancelled', // aborted due to cancelation
  Failed = 'failed', // aborted due to failure
}
