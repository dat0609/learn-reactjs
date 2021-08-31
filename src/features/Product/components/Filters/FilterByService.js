import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Checkbox, FormControlLabel, makeStyles, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    borderTop: '1px solid',
  },
  list: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',

    '& > li': {
      marginTop: theme.spacing(1),
      margin: 0,
    },
  },
}));

FilterByService.propTypes = {
  onChange: PropTypes.func,
  filter: PropTypes.object,
};

function FilterByService(props) {
  const classes = useStyles();
  const { onChange, filter = {} } = props;

  const handleChange = (e) => {
    if (!onChange) return;

    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DICH VU</Typography>
      <ul className={classes.list}>
        {[
          { value: 'isPromotion', label: 'Promotion' },
          { value: 'isFreeShip', label: 'FreeShip' },
        ].map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filter[service.value])}
                  onChange={handleChange}
                  name={service.value}
                  color="primary"
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;
