import { FeatureSample } from '../components';
import { Loading } from '@shared/components';
import { ApiRatesResponse } from '@core/api/models/api-req-res.model';
import { useFetch } from '@core/api/hooks';
import * as fromApiUtils from '@core/api/utils';

interface FeatureSampleContainerProps {
  quoteCode?: string;
}
export function FeatureSampleContainer({ quoteCode }: FeatureSampleContainerProps) {
  const url = quoteCode
    ? fromApiUtils.getSampleApiWithQuote(quoteCode)
    : fromApiUtils.getSampleApiBase();

  const [response, error] = useFetch<ApiRatesResponse>(url);

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
