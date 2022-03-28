import { User, UserDetails } from '@example-app/users/data-access';

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
