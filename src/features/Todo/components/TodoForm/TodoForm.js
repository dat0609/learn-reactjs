import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
  title: PropTypes.string,
};

function TodoForm(props) {
  const schema = yup.object().shape({
    title: yup.string().required('Enter title'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const myHandleSubmit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(myHandleSubmit)}>
      <TextField {...register('title')} name="title" />
      <br />
      <p>{errors.title?.message}</p>
      <br />
      <input type="submit" />
    </form>
  );
}

export default TodoForm;
