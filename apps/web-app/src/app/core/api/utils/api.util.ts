import { AxiosError } from 'axios';

export function getErrorMessage(error: AxiosError): string {
  if (error.response) {
    const { response } = error;
    // Request made and server responded
    return (
      (response.data && response.data.message) || response.statusText || response.status
    );
  } else if (error.request) {
    const { request } = error;
    // The request was made but no response was received
    return request.statusText || request.responseText || request.status;
  } else {
    // Something happened in setting up the request that triggered an Error
    return error.message;
  }
}
