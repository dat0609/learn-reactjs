import { Box, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_URL } from 'constant/common';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { formatPrice } from 'utils/common';

Product.propTypes = {
  product: PropTypes.object,
};

function Product(props) {
  const history = useHistory();
  const { product } = props;
  const thumbnailUrl = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : `${THUMBNAIL_URL}`;

  const handleClick = () => {
    history.push(`/product/${product.id}`);
  };
  return (
    <Box padding={1} onClick={handleClick}>
      <Box padding={1} minHeight="215px">
        <img src={thumbnailUrl} alt={product.name} width="100%"></img>
      </Box>
      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box fontSize="16px" fontWeight="bold" component="span">
          {formatPrice(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 ? ` - ${product.promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
}

export default Product;
