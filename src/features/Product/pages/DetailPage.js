import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import { addToCart } from 'features/Cart/CartSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddToCartForm from '../components/AddToCartForm';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../Hooks/useProductDetail';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: '1px solid',
  },
  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },
  page: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',

    marginTop: '50px',
    paddingBottom: '15px',
  },
}));

DetailPage.propTypes = {};

function DetailPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    params: { productId },
    url,
  } = useRouteMatch();

  const { product, loading } = useProductDetail(productId);
  if (loading) {
    return (
      <Box>
        <LinearProgress />
      </Box>
    );
  }

  const handleAddToCart = (values) => {
    const action = addToCart({
      id: product.id,
      product,
      quantity: values.quantity,
    });
    dispatch(action);
  };

  return (
    <Box>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCart} />
            </Grid>
          </Grid>
        </Paper>

        <ProductMenu />

        <Switch>
          <Route path={url} exact>
            <ProductDescription product={product} />
          </Route>
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;
