import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { Paper } from '@material-ui/core';
import DOMPurify from 'dompurify';

ProductDescription.propTypes = {
  product: PropTypes.object,
};

function ProductDescription(props) {
  const { product } = props;
  //avoid XSS attacks
  const safeDescription = DOMPurify.sanitize(product.description);

  return (
    <Paper elevation={0} style={{ padding: '15px' }}>
      {parse(safeDescription)}
    </Paper>
  );
}

export default ProductDescription;
