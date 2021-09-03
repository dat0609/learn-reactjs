import { Box } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { cartTotalSelector } from './selectors';

CartFeature.propTypes = {};

function CartFeature(props) {
  const cartTotal = useSelector(cartTotalSelector);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const element = cartItems.map((cartItem) => (
    <ul key={cartItem.id}>
      <li>
        {cartItem.product.name} {cartItem.product.salePrice} {cartItem.quantity}
      </li>
    </ul>
  ));

  return (
    <Box>
      {element}
      Total {cartTotal}
    </Box>
  );
}

export default CartFeature;
