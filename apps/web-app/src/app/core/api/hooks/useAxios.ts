import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { sampleApi } from '../utils';

export const useAxiosGet = <T>(
  url: string,
  config?: AxiosRequestConfig,
  axiosInstance: AxiosInstance = sampleApi.instance
): [T, AxiosError] => {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    axiosInstance
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
  url: string,
  config?: AxiosRequestConfig,
  axiosInstance: AxiosInstance = sampleApi.instance
): [T, AxiosError] => {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    axiosInstance
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
