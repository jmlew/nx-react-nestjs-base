import { ApiRatesResponse } from '@api-interfaces/models/api-req-res.model';
import { ApiUrl } from '@api-interfaces/enums/api-config.enum';

import { FeatureSample } from '../components';
import { useAxiosGet } from '../../../core/api/hooks';
import { Loading, ErrorMessage } from '../../../shared/components';
import { sampleApi } from '../../../core/api/utils';

interface FeatureSampleContainerProps {
  quoteCode?: string;
}

export function FeatureSampleContainer({ quoteCode }: FeatureSampleContainerProps) {
  const url = sampleApi.apiBase;
  const params = quoteCode != null && {
    [ApiUrl.Symbols]: quoteCode,
  };

  const [response, error] = useAxiosGet<ApiRatesResponse>(url, { params });

  if (response) {
    if (response.success) {
      return <FeatureSample data={response} />;
    } else {
      return response.error ? (
        <ErrorMessage message={response.error.message} />
      ) : (
        <Loading />
      );
    }
  } else {
    return error ? <ErrorMessage message={error.message} /> : <Loading />;
  }
}
