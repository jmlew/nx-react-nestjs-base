import { useFormik } from 'formik';

import { UserParam } from '@api-configs/features/enums/user-api.enum';
import { User, UserDetails } from '@api-configs/features/models/user-api-data.model';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  TextField,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { isFieldError } from '../../../shared/utils';
import {
  userFormAutocompleteMap,
  userFormLabelMap,
  userFormValidationSchema,
} from '../constants';

interface UserDetailsFormDataDrivenFormsProps {
  user?: User;
  initialValues: UserDetails;
  onSubmit: (values: UserDetails) => void;
  onCancel: () => void;
}

export function UserDetailsFormDataDrivenForms({
  user,
  initialValues,
  onSubmit,
  onCancel,
}: UserDetailsFormDataDrivenFormsProps) {
  const formik = useFormik({
    initialValues,
    validationSchema: userFormValidationSchema,
    onSubmit: (values: UserDetails) => {
      onSubmit(values);
    },
  });

  return (
    <Container maxWidth="sm">
      <Card>
        <form onSubmit={formik.handleSubmit}>
          <CardContent sx={{ pt: 4, pb: 2, px: 4 }}>
            <Typography variant="h4" color="textPrimary">
              {user == null ? 'New User' : `Edit User ${user.id}`}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              sx={{ mt: 1, ml: 0.3 }}
            >
              Sample MUI form using Data Driven Forms.
            </Typography>
            <Divider flexItem={true} sx={{ my: 3 }} />
            <TextField
              {...formik.getFieldProps(UserParam.FirstName)}
              error={isFieldError(UserParam.FirstName, formik.touched, formik.errors)}
              label={userFormLabelMap.get(UserParam.FirstName)}
              autoComplete={userFormAutocompleteMap.get(UserParam.FirstName)}
              helperText={formik.errors[UserParam.FirstName]}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              {...formik.getFieldProps(UserParam.LastName)}
              error={isFieldError(UserParam.LastName, formik.touched, formik.errors)}
              label={userFormLabelMap.get(UserParam.LastName)}
              autoComplete={userFormAutocompleteMap.get(UserParam.LastName)}
              helperText={formik.errors[UserParam.LastName]}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              {...formik.getFieldProps(UserParam.Email)}
              error={isFieldError(UserParam.Email, formik.touched, formik.errors)}
              label={userFormLabelMap.get(UserParam.Email)}
              autoComplete={userFormAutocompleteMap.get(UserParam.Email)}
              helperText={formik.errors[UserParam.Email]}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Divider flexItem={true} sx={{ mt: 3 }} />
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end', mr: 3, mb: 2 }}>
            <Button onClick={onCancel}>Cancel</Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
}
