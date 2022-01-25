import { EnvVar } from '@shared/enums/environment.enum';
import { getEnvVar } from '@shared/utils/env-vars.util';
import { ApiUrl } from '../enums/api-config.enum';

export function getSampleApiBase() {
  return `${ApiUrl.Base}${ApiUrl.Latest}?${ApiUrl.AccessKey}=${getEnvVar(
    EnvVar.API_ACCESS_KEY
  )}`;
}

export function getSampleApiWithQuote(quoteCode: string) {
  return `${getSampleApiBase()}&${ApiUrl.Symbols}=${quoteCode}`;
}
