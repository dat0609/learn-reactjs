import { Tab, Tabs } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

ProductSort.propTypes = {
  currentSort: PropTypes.string,
  onChange: PropTypes.func,
};

function ProductSort(props) {
  const { currentSort, onChange } = props;

  const handleSortChange = (e, newValue) => {
    if (onChange) onChange(newValue);
  };

  return (
    <>
      <Tabs value={currentSort} indicatorColor="primary" textColor="primary" onChange={handleSortChange}>
        <Tab label="Giá thấp tới cao" value="salePrice:ASC"></Tab>
        <Tab label="Giá cao tới thấp" value="salePrice:DESC"></Tab>
        <Tab label="Sort by name" value="name:ASC"></Tab>
      </Tabs>
    </>
  );
}

export default ProductSort;
