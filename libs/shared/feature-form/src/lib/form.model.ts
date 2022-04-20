import { FormParamAuth, FormParamUser } from './form.enum';

export type FormField = FormParamUser | FormParamAuth;

export interface FormParams {
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}
