import { FormikErrors, FormikTouched } from 'formik';

export function isFieldError<T>(
  field: keyof T,
  touched: FormikTouched<T>,
  errors: FormikErrors<T>
): boolean {
  return isFieldTouched(field, touched) && errors[field] != null;
}

export function isFieldTouched<T>(field: keyof T, touched: FormikTouched<T>): boolean {
  return touched[field] != null;
}
