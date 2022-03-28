export enum FormParamUser {
  Email = 'email',
  FirstName = 'first_name',
  LastName = 'last_name',
  Avatar = 'avatar',
}

export enum FormParamAuth {
  Password = 'password',
  PasswordConfirm = 'password_confirm',
}

export enum FormValidationError {
  EmailInvalid = 'Invalid email address',
  PasswordMatch = 'Passwords must match',
  PasswordMin = 'Must be 8 or more characters',
  Required = 'Required',
}
