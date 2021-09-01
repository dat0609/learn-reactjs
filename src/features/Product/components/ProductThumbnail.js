import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_URL } from 'constant/common';

ProductThumbnail.propTypes = {
  product: PropTypes.object.isRequired,
};

function ProductThumbnail(props) {
  const { product } = props;
  const thumbnailUrl = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : `${THUMBNAIL_URL}`;

  return (
    <Box>
      <img src={thumbnailUrl} alt={product.name} width="100%"></img>
    </Box>
  );
}

export default ProductThumbnail;
