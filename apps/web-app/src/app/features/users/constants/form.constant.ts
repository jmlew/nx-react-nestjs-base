import { UserParam } from '@api-configs/features/enums/user-api.enum';

export const userFormLabelMap: Map<UserParam, string> = new Map([
  [UserParam.Email, 'Email'],
  [UserParam.FirstName, 'First Name'],
  [UserParam.LastName, 'Last Name'],
]);

export const userFormAutocompleteMap: Map<UserParam, string> = new Map([
  [UserParam.Email, 'email'],
  [UserParam.FirstName, 'given-name'],
  [UserParam.LastName, 'family-name'],
]);
