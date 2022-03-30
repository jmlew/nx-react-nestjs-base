import { useEffect, useState } from 'react';

export const useFetch = <T>(input: Request | string, init?: RequestInit): [T, Error] => {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    async function fetchData() {
      try {
        const res: Response = await fetch(input);
        const data: T = (await res.json()) as T;
        setResponse(data);
      } catch (error) {
        setError(error as Error);
      }
    }
    fetchData();
  }, [input]);

  return [response as T, error as Error];
};
