import { AxiosError } from 'axios';

/**
 * Returns the most useful value from the Axios HTTP error to act as the error message.
 */
function getApiErrorMessage(error: AxiosError): string {
  if (error.response) {
    const { response } = error;
    // Request made and server responded
    return response.data
      ? response.data.message
      : response.data.error || response.statusText || response.status;
  } else if (error.request) {
    // The request was made but no response was received
    const { request } = error;
    return request.statusText || request.responseText || request.status;
  } else {
    // Something happened in setting up the request that triggered an Error
    return error.message;
  }
}

/**
 * Noralises the API request error by replacing the default HTTP Error.message value with the
 * most useful AxiosError value.
 */
export function normaliseApiErrorMessage(error: AxiosError) {
  error.message = getApiErrorMessage(error);
}
