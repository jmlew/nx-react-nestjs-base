import * as Yup from 'yup';

import { FormValidationError } from '@example-app/form/feature';
import { UserParam, UserRegisterParam } from '@example-app/users/data-access';

export const userFormValidationSchema = Yup.object({
  [UserParam.FirstName]: Yup.string().required(FormValidationError.Required),
  [UserParam.LastName]: Yup.string().required(FormValidationError.Required),
  [UserParam.Email]: Yup.string()
    .email(FormValidationError.EmailInvalid)
    .required(FormValidationError.Required),
});

export const registerFormValidationSchema = Yup.object({
  [UserRegisterParam.Password]: Yup.string()
    .min(8, FormValidationError.PasswordMin)
    .required(FormValidationError.Required),
  [UserRegisterParam.PasswordConfirm]: Yup.string()
    .min(8, FormValidationError.PasswordMin)
    .required(FormValidationError.Required)
    .oneOf([Yup.ref(UserRegisterParam.Password)], FormValidationError.PasswordMatch),
});
