import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    borderTop: '1px solid',
  },
  range: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    display: 'flex',
    flexGrow: 'row nowrap',
    alignItems: 'center',

    '& > span': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
}));

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

function FilterByPrice(props) {
  const classes = useStyles();
  const { onChange } = props;

  const [value, setValue] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handleSubmitPrice = () => {
    if (onChange) onChange(value);
  };

  const handleChange = (e) => {
    setValue((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">GIA</Typography>
      <Box className={classes.range}>
        <TextField name="salePrice_gte" value={value.salePrice_gte} onChange={handleChange} />
        <span>-</span>
        <TextField name="salePrice_lte" value={value.salePrice_lte} onChange={handleChange} />
      </Box>
      <Button variant="outlined" color="primary" onClick={handleSubmitPrice}>
        Ap Dung
      </Button>
    </Box>
  );
}

export default FilterByPrice;
