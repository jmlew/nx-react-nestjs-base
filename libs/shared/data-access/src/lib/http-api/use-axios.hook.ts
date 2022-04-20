import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export const useAxiosGet = <T>(
  axios: AxiosInstance,
  url: string,
  config?: AxiosRequestConfig
): [T, AxiosError] => {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    axios
      .get(url, config)
      .then((res: AxiosResponse<T>) => {
        setResponse(res.data);
      })
      .catch((err: AxiosError) => {
        setError(err);
      });
  }, [url]); // eslint-disable-line react-hooks/exhaustive-deps

  return [response as T, error as AxiosError];
};

export const useAxiosPost = <T>(
  axios: AxiosInstance,
  url: string,
  config?: AxiosRequestConfig
): [T, AxiosError] => {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    axios
      .post(url, config)
      .then((res: AxiosResponse<T>) => {
        setResponse(res.data);
      })
      .catch((err: AxiosError) => {
        setError(err);
      });
  }, [url]); // eslint-disable-line react-hooks/exhaustive-deps

  return [response as T, error as AxiosError];
};
