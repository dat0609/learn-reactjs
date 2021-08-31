import { Box, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React from 'react';

CategorySkeleton.propTypes = {
  length: PropTypes.number,
};

CategorySkeleton.defaultProps = {
  length: 8,
};

function CategorySkeleton(props) {
  const { length } = props;
  return (
    <>
      <Box>
        <Grid container>
          {Array.from(new Array(length)).map((x, index) => (
            <Grid item key={index} sx={12} sm={6} md={4} lg={3}>
              <Box padding={1}>
                <Skeleton />
                <Skeleton width="100%" />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default CategorySkeleton;
