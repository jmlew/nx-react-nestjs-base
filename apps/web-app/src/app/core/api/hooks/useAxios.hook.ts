import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';

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
  }, [url]);

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
  }, [url]);

  return [response as T, error as AxiosError];
};
