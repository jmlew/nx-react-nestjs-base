import { ApiUrl } from '@api-interfaces/enums/api-config.enum';
import { EnvVar } from '../../../shared/enums/environment.enum';
import { getEnvVar } from '../../../shared/utils/env-vars.util';

export function getSampleApiBase() {
  return `${ApiUrl.Base}${ApiUrl.Latest}?${ApiUrl.AccessKey}=${getEnvVar(
    EnvVar.API_ACCESS_KEY
  )}`;
}

export function getSampleApiWithQuote(quoteCode: string) {
  return `${getSampleApiBase()}&${ApiUrl.Symbols}=${quoteCode}`;
}
