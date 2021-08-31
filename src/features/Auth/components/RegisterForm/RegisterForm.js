import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles, TextField, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(2),
  },
  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    textAlign: 'center',
    margin: theme.spacing(2, 0, 3, 0),
  },
  submit: {
    margin: theme.spacing(2, 0, 2, 0),
  },
  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
  title: PropTypes.string,
};

function RegisterForm(props) {
  const classes = useStyles();

  const schema = yup.object().shape({
    fullName: yup.string().required('Please enter full name'),
    email: yup.string().required('Please enter email').email('Enter valid email'),
    password: yup.string().required('Please enter password').min(6, 'at lease 6 characters'),
    retypePassword: yup
      .string()
      .required('Please retype password')
      .oneOf([yup.ref('password')], 'Password not match'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const myHandleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <div className={classes.root} fullWidth>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Avatar className={classes.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>

      <Typography className={classes.title} component="h3" variant="h5">
        Create account
      </Typography>

      <form onSubmit={handleSubmit(myHandleSubmit)} fullWidth>
        <TextField
          {...register('fullName')}
          fullWidth
          name="fullName"
          label="Full Name"
          variant="outlined"
          margin="normal"
        />
        <small>{errors.fullName?.message}</small>
        <TextField {...register('email')} fullWidth name="email" label="Email" variant="outlined" margin="normal" />
        <small>{errors.email?.message}</small>
        <TextField
          {...register('password')}
          fullWidth
          name="password"
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
        />
        <small>{errors.password?.message}</small>
        <TextField
          fullWidth
          {...register('retypePassword')}
          name="retypePassword"
          label="Retype Password"
          variant="outlined"
          margin="normal"
          type="password"
        />
        <small>{errors.retypePassword?.message}</small>
        <br />

        <Button
          disabled={isSubmitting}
          type="submit"
          className={classes.submit}
          variant="contained"
          color="primary"
          fullWidth
        >
          Create
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
