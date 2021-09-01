import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { formatPrice } from 'utils/common';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
    borderBottom: '1px solid',
  },
  description: {
    margin: theme.spacing(2, 0),
  },
  salePrice: {
    color: 'red',
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 'bold',
    marginRight: theme.spacing(3),
  },
  originalPrice: {
    marginRight: theme.spacing(2),
    textDecoration: 'line-through',
  },
  promotionPercent: {},
  name: {},
  priceBox: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.grey[200],
  },
}));

ProductInfo.propTypes = {
  product: PropTypes.object,
};

function ProductInfo(props) {
  const { product } = props;
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } = product;

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h4">
        {name}
      </Typography>
      <Typography variant="body2" className={classes.description}>
        {shortDescription}
      </Typography>

      <Box className={classes.priceBox}>
        <Box component="span" className={classes.salePrice}>
          {formatPrice(salePrice)}
        </Box>

        {promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {formatPrice(originalPrice)}
            </Box>
            <Box component="span">{` - ${promotionPercent}%`}</Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProductInfo;
