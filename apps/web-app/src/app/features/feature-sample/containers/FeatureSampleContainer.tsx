import { FeatureSample } from '../components';
import { ApiRatesResponse } from '@api-interfaces/models/api-req-res.model';
import * as fromApiUtils from '../../../core/api/utils';
import { useFetch } from '../../../core/api/hooks';
import { Loading } from '../../../shared/components';

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
