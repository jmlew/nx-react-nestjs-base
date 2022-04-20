import { FormParams } from '@example-app/shared/feature-form';
import { User, UserDetails } from '@example-app/users/domain';

export function getUserFormParams(user?: User): FormParams {
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

// TODO: add normlaisation logic to vconvert form params to user model.
export function getUserFormReturnValues(params: FormParams): UserDetails {
  return params as UserDetails;
}
