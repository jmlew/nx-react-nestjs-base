import { useFormik } from 'formik';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Box,
  Grid,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { User, UserDetails } from '@api-interfaces/features/models/user-api-data.model';
import { UserParam } from '@api-interfaces/features/enums/user-api.enum';

import { isFieldError } from '../../../shared/utils';
import {
  userFormAutocompleteMap,
  userFormLabelMap,
  userFormValidationSchema,
} from '../constants';

interface UserDetailsProps {
  user?: User;
  initialValues: UserDetails;
  onSubmit: (values: UserDetails) => void;
  onCancel: () => void;
}

export function UserDetailsForm({
  user,
  initialValues,
  onSubmit,
  onCancel,
}: UserDetailsProps) {
  const formik = useFormik({
    initialValues,
    validationSchema: userFormValidationSchema,
    onSubmit: (values: UserDetails) => {
      onSubmit(values);
    },
  });

  return (
    <Card sx={{ width: '80%', maxWidth: 900, minWidth: 300 }}>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <Typography gutterBottom variant="h4">
            {user == null ? 'New User' : `Edit User ${user.id}`}
          </Typography>
          <Divider flexItem={true} />
          <Grid container={true} rowSpacing={4} columnSpacing={2} sx={{ py: 4, px: 2 }}>
            <Grid item={true} xs={12} sm={6}>
              <TextField
                {...formik.getFieldProps(UserParam.FirstName)}
                error={isFieldError(UserParam.FirstName, formik.touched, formik.errors)}
                label={userFormLabelMap.get(UserParam.FirstName)}
                autoComplete={userFormAutocompleteMap.get(UserParam.FirstName)}
                helperText={formik.errors[UserParam.FirstName]}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item={true} xs={12} sm={6}>
              <TextField
                {...formik.getFieldProps(UserParam.LastName)}
                error={isFieldError(UserParam.LastName, formik.touched, formik.errors)}
                label={userFormLabelMap.get(UserParam.LastName)}
                autoComplete={userFormAutocompleteMap.get(UserParam.LastName)}
                helperText={formik.errors[UserParam.LastName]}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item={true} xs={12} sm={6}>
              <TextField
                {...formik.getFieldProps(UserParam.Email)}
                error={isFieldError(UserParam.Email, formik.touched, formik.errors)}
                label={userFormLabelMap.get(UserParam.Email)}
                autoComplete={userFormAutocompleteMap.get(UserParam.Email)}
                helperText={formik.errors[UserParam.Email]}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Divider flexItem={true} />
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </CardActions>
      </form>
    </Card>
  );
}
