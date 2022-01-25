export interface ApiResponseBase {
  error?: ApiResponseError;
  success: boolean;
  timestamp: number;
}

export interface ApiResponseError {
  code: string;
  message: string;
}

export interface ApiRatesResponse extends ApiResponseBase {
  base: string;
  date: string;
  rates: ApiRates;
}

export interface ApiRates {
  [code: string]: number;
}
