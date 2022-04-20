import { useFormik } from 'formik';

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

import {
  createValidationSchema,
  formAutocompleteMap,
  formLabelMap,
} from '../form.constant';
import { FormParamUser } from '../form.enum';
import { FormParams } from '../form.model';
import { isFieldError } from '../formik.util';

// TODO: Implement form using Data Drive Forms (https://data-driven-forms.org) and move into @example-app/form/ui lib

interface DataDrivenFormProps {
  isNewUser: boolean;
  initialValues: FormParams;
  onSubmit: (values: FormParams) => void;
  onCancel: () => void;
}

export function DataDrivenForm({
  isNewUser,
  initialValues,
  onSubmit,
  onCancel,
}: DataDrivenFormProps) {
  const formik = useFormik({
    initialValues,
    validationSchema: createValidationSchema([
      FormParamUser.FirstName,
      FormParamUser.LastName,
      FormParamUser.Email,
    ]),
    onSubmit: (values: FormParams) => {
      onSubmit(values);
    },
  });

  if (!formik.isValid) {
    console.log(formik.errors);
  }

  return (
    <Container maxWidth="sm">
      <Card>
        <form onSubmit={formik.handleSubmit}>
          <CardContent sx={{ pt: 4, pb: 2, px: 4 }}>
            <Typography variant="h4" color="textPrimary">
              {isNewUser ? 'New User' : 'Edit User'}
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
              {...formik.getFieldProps(FormParamUser.FirstName)}
              error={isFieldError(FormParamUser.FirstName, formik.touched, formik.errors)}
              label={formLabelMap.get(FormParamUser.FirstName)}
              autoComplete={formAutocompleteMap.get(FormParamUser.FirstName)}
              helperText={formik.errors[FormParamUser.FirstName]}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              {...formik.getFieldProps(FormParamUser.LastName)}
              error={isFieldError(FormParamUser.LastName, formik.touched, formik.errors)}
              label={formLabelMap.get(FormParamUser.LastName)}
              autoComplete={formAutocompleteMap.get(FormParamUser.LastName)}
              helperText={formik.errors[FormParamUser.LastName]}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              {...formik.getFieldProps(FormParamUser.Email)}
              error={isFieldError(FormParamUser.Email, formik.touched, formik.errors)}
              label={formLabelMap.get(FormParamUser.Email)}
              autoComplete={formAutocompleteMap.get(FormParamUser.Email)}
              helperText={formik.errors[FormParamUser.Email]}
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
