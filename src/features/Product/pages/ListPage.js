import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import FilterViewer from '../components/Filters/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import queryString from 'query-string';

ListPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0',
  },
  page: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',

    marginTop: '50px',
    paddingBottom: '15px',
  },
}));

function ListPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    count: 1,
    page: 1,
  });
  //   const [filter, setFilter] = useState(() => ({
  //     ...queryParams,
  //     _page: Number.parseInt(queryParams._page) || 1,
  //     _limit: Number.parseInt(queryParams._limit) || 12,
  //     _sort: queryParams._sort || 'salePrice:ASC',
  //   }));

  //   useEffect(() => {
  //     //set filter into URL
  //     history.push({
  //       path: history.location.path,
  //       search: queryString.stringify(filter),
  //     });
  //   }, [history, filter]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setPagination(pagination);
        setProductList(data);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }

      setLoading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    const filter = {
      ...queryParams,
      _page: page,
    };

    history.push({
      path: history.location.pathname,
      search: queryString.stringify(filter),
    });
  };

  const handleSortChange = (newSortValue) => {
    const filter = {
      ...queryParams,
      _sort: newSortValue,
    };

    history.push({
      path: history.location.pathname,
      search: queryString.stringify(filter),
    });
  };

  const handleFilterChange = (newFilterValue) => {
    const filter = {
      ...queryParams,
      ...newFilterValue,
    };

    history.push({
      path: history.location.pathname,
      search: queryString.stringify(filter),
    });
  };

  const setNewFilter = (newFilterValue) => {
    history.push({
      path: history.location.pathname,
      search: queryString.stringify(newFilterValue),
    });
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters filters={queryParams} onChange={handleFilterChange} />
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
              <FilterViewer filter={queryParams} onChange={setNewFilter} />

              {loading ? <ProductSkeletonList /> : <ProductList data={productList} />}
              <Box className={classes.page}>
                <Pagination
                  count={Math.ceil(pagination.total / pagination.limit)}
                  color="primary"
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
