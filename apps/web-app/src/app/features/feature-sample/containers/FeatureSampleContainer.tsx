import { FeatureSample } from '../components';
import { ApiRatesResponse } from '@api-interfaces/models/api-req-res.model';
import { useFetch } from '../../../core/api/hooks';
import { Loading } from '../../../shared/components';
import { sampleApi } from '../../../core/api/utils';
import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiUrl } from '@api-interfaces/enums/api-config.enum';

interface FeatureSampleContainerProps {
  quoteCode?: string;
}
export function FeatureSampleContainer({ quoteCode }: FeatureSampleContainerProps) {
  // const [response, error] = useFetch<ApiRatesResponse>(url);
  const [response, setResponse] = useState<ApiRatesResponse>();
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    const url = sampleApi.apiBase;
    const params = quoteCode != null && {
      [ApiUrl.Symbols]: quoteCode,
    };
    sampleApi.instance
      .get(url, { params })
      .then((res: AxiosResponse<ApiRatesResponse>) => {
        setResponse(res.data);
      })
      .catch((err: AxiosError) => {
        setError(err);
      });
  }, []);

  if (response) {
    if (response.success) {
      return <FeatureSample data={response} />;
    } else {
      return response.error ? <div>{response.error.message}</div> : <Loading />;
    }
  } else {
    return error ? <div>{error.message}</div> : <Loading />;
  }
}
