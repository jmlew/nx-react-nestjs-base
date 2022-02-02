import { useFormik } from 'formik';
import { Card, CardContent, CardActions, Button, TextField, Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { User, UserDetails } from '@api-interfaces/features/models/user-api-data.model';
import { UserParam } from '@api-interfaces/features/enums/user-api.enum';
import { isFieldError } from '../../../shared/utils';
import { userFormAutocompleteMap, userFormValidationSchema } from '../constants';

interface UserDetailsProps {
  user: User;
  onSubmit: (values: UserDetails) => void;
  onCancel: () => void;
}

export function UserDetailsForm({ user, onSubmit, onCancel }: UserDetailsProps) {
  const { id: remove, ...initialValues } = user;

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userFormValidationSchema,
    onSubmit: (values: UserDetails) => {
      onSubmit(values);
    },
  });

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, mt: 2, mb: 2, width: '25ch' },
      }}
      onSubmit={formik.handleSubmit}
    >
      <Card sx={{ width: 800 }}>
        <CardContent>
          <Typography gutterBottom variant="h4">
            User {user.id} Details
          </Typography>
          <Divider flexItem={true} />
          <Box>
            <TextField
              {...formik.getFieldProps(UserParam.FirstName)}
              error={isFieldError(UserParam.FirstName, formik.touched, formik.errors)}
              helperText={formik.errors[UserParam.FirstName]}
              autoComplete={userFormAutocompleteMap.get(UserParam.FirstName)}
              label="First Name"
              variant="outlined"
            />
            <TextField
              {...formik.getFieldProps(UserParam.LastName)}
              error={isFieldError(UserParam.LastName, formik.touched, formik.errors)}
              helperText={formik.errors[UserParam.LastName]}
              autoComplete={userFormAutocompleteMap.get(UserParam.LastName)}
              label="Last Name"
              variant="outlined"
            />
            <TextField
              {...formik.getFieldProps(UserParam.Email)}
              error={isFieldError(UserParam.Email, formik.touched, formik.errors)}
              helperText={formik.errors[UserParam.Email]}
              autoComplete={userFormAutocompleteMap.get(UserParam.Email)}
              label="Email"
              variant="outlined"
            />
          </Box>
          <Divider flexItem={true} />
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
