import * as Yup from 'yup';

import { FormParamAuth, FormParamUser, FormValidationError } from './form.enum';
import { FormField } from './form.model';

const formValidationSchemaAll: Record<FormField, unknown> = {
  [FormParamUser.FirstName]: Yup.string().required(FormValidationError.Required),
  [FormParamUser.LastName]: Yup.string().required(FormValidationError.Required),
  [FormParamUser.Email]: Yup.string()
    .email(FormValidationError.EmailInvalid)
    .required(FormValidationError.Required),
  [FormParamAuth.Password]: Yup.string()
    .min(8, FormValidationError.PasswordMin)
    .required(FormValidationError.Required),
  [FormParamAuth.PasswordConfirm]: Yup.string()
    .min(8, FormValidationError.PasswordMin)
    .required(FormValidationError.Required)
    .oneOf([Yup.ref(FormParamAuth.Password)], FormValidationError.PasswordMatch),
  [FormParamUser.Avatar]: null,
};

export function createValidationSchema(fields: FormField[]) {
  const validationSchema = fields.reduce((accum, field) => {
    return { ...accum, [field]: formValidationSchemaAll[field] };
  }, {});
  return Yup.object(validationSchema);
}

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
