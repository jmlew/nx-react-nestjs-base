import { User, UserDetails } from '@api-interfaces/features/models/user-api-data.model';

export function getUserFormInitialValues(user?: User): UserDetails {
  if (user == null) {
    return {
      first_name: '',
      last_name: '',
      email: '',
    };
  } else {
    const { id: remove, ...initialValues } = user;
    return initialValues;
  }
}
