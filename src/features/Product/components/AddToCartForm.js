import { yupResolver } from '@hookform/resolvers/yup';
import { Button, makeStyles, TextField } from '@material-ui/core';
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

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm(props) {
  const classes = useStyles();

  const schema = yup.object().shape({
    quantity: yup.number().required('Please enter quantity').min(1, 'At least 1 ').typeError('Please enter a number'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    <div className={classes.root}>
      <form onSubmit={handleSubmit(myHandleSubmit)}>
        <TextField {...register('quantity')} label="Quantity" variant="outlined" margin="normal" type="number" /> <br />
        <small style={{ color: 'red' }}>{errors.quantity?.message}</small>
        <br />
        <Button type="submit" variant="contained" color="primary">
          Add To Cart
        </Button>
      </form>
    </div>
  );
}

export default AddToCartForm;
