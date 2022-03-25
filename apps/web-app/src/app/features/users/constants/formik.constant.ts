import * as Yup from 'yup';

import { UserParam, UserRegisterParam } from '@api-configs/features/enums/user-api.enum';

import { FormValidationError } from '../../../shared/enums/form.enum';

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