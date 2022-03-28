import * as Yup from 'yup';

import { UserParam, UserRegisterParam } from '@example-app/users/data-access';

import { UserFormField } from './form.model';

enum ValidationError {
  EmailInvalid = 'Invalid email address',
  PasswordMatch = 'Passwords must match',
  PasswordMin = 'Must be 8 or more characters',
  Required = 'Required',
}

export const formValidationSchema = Yup.object({
  [UserParam.FirstName]: Yup.string().required(ValidationError.Required),
  [UserParam.LastName]: Yup.string().required(ValidationError.Required),
  [UserParam.Email]: Yup.string()
    .email(ValidationError.EmailInvalid)
    .required(ValidationError.Required),
  [UserRegisterParam.Password]: Yup.string()
    .min(8, ValidationError.PasswordMin)
    .required(ValidationError.Required),
  [UserRegisterParam.PasswordConfirm]: Yup.string()
    .min(8, ValidationError.PasswordMin)
    .required(ValidationError.Required)
    .oneOf([Yup.ref(UserRegisterParam.Password)], ValidationError.PasswordMatch),
});

export const formAutocompleteMap: Map<UserFormField, string> = new Map([
  [UserParam.Email, 'email'],
  [UserParam.FirstName, 'given-name'],
  [UserParam.LastName, 'family-name'],
]);
