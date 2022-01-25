import { ApiGlobalParam, ApiUrl } from '../enums/api-config.enum';

export function getSampleApiBase() {
  return `${ApiUrl.Base}${ApiUrl.Latest}?${ApiUrl.AccessKey}=${ApiGlobalParam.ApiAccessKey}`;
}

export function getSampleApiWithQuote(quoteCode: string) {
  return `${getSampleApiBase()}&${ApiUrl.Symbols}=${quoteCode}`;
}
