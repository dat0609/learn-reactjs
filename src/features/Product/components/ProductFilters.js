import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilters(props) {
  const { filters, onChange } = props;

  const handleCategoryChange = (cateId) => {
    if (!onChange) return;

    const newFilters = {
      ...filters,
      'category.id': cateId,
    };
    onChange(newFilters);
  };

  const handleFilterChange = (price) => {
    if (onChange) onChange(price);
  };

  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange}></FilterByCategory>
      <FilterByPrice onChange={handleFilterChange}></FilterByPrice>
      <FilterByService filter={filters} onChange={handleFilterChange} />
    </Box>
  );
}

export default ProductFilters;
