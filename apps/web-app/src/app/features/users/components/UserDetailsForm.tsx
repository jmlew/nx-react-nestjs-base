import { FormikHelpers, useFormik } from 'formik';
import { Card, CardContent, CardActions, Button, TextField, Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { User, UserDetails } from '@api-interfaces/features/models/user-api-data.model';
import { UserParam } from '@api-interfaces/features/enums/user-api.enum';

interface UserDetailsProps {
  user: User;
  onSubmit: (values: UserDetails) => void;
  onCancel: () => void;
}

export function UserDetailsForm({ user, onSubmit, onCancel }: UserDetailsProps) {
  const { id: remove, ...initialValues } = user;

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  function handleSubmit(
    values: UserDetails,
    { setSubmitting }: FormikHelpers<UserDetails>
  ) {
    setSubmitting(true);
    onSubmit(values);
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, mt: 2, mb: 2, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
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
              id={UserParam.FirstName}
              name={UserParam.FirstName}
              value={formik.values[UserParam.FirstName]}
              onChange={formik.handleChange}
              label="First Name"
              variant="outlined"
            />
            <TextField
              id={UserParam.LastName}
              name={UserParam.LastName}
              value={formik.values[UserParam.LastName]}
              onChange={formik.handleChange}
              label="Last Name"
              variant="outlined"
            />
            <TextField
              id={UserParam.Email}
              name={UserParam.Email}
              value={formik.values[UserParam.Email]}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
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
