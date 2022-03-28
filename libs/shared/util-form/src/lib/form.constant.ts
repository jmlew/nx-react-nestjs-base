import * as Yup from 'yup';

import { FormParamAuth, FormParamUser } from './form.enum';
import { FormField } from './form.model';

enum ValidationError {
  EmailInvalid = 'Invalid email address',
  PasswordMatch = 'Passwords must match',
  PasswordMin = 'Must be 8 or more characters',
  Required = 'Required',
}

export const formValidationSchema = Yup.object({
  [FormParamUser.FirstName]: Yup.string().required(ValidationError.Required),
  [FormParamUser.LastName]: Yup.string().required(ValidationError.Required),
  [FormParamUser.Email]: Yup.string()
    .email(ValidationError.EmailInvalid)
    .required(ValidationError.Required),
  [FormParamAuth.Password]: Yup.string()
    .min(8, ValidationError.PasswordMin)
    .required(ValidationError.Required),
  [FormParamAuth.PasswordConfirm]: Yup.string()
    .min(8, ValidationError.PasswordMin)
    .required(ValidationError.Required)
    .oneOf([Yup.ref(FormParamAuth.Password)], ValidationError.PasswordMatch),
});

export const formLabelMap: Map<FormField, string> = new Map([
  [FormParamUser.Email, 'Email'],
  [FormParamUser.FirstName, 'First Name'],
  [FormParamUser.LastName, 'Last Name'],
]);

export const formAutocompleteMap: Map<FormField, string> = new Map([
  [FormParamUser.Email, 'email'],
  [FormParamUser.FirstName, 'given-name'],
  [FormParamUser.LastName, 'family-name'],
]);
