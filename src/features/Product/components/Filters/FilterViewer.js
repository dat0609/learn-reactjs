import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles } from '@material-ui/core';

FilterViewer.propTypes = {
  filter: PropTypes.object,
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',

    margin: theme.spacing(2),
    listStyleType: 'none',

    '& > li': {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
}));

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Free Ship',
    isActive: (filter) => filter.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filter) => {
      const newFilters = { ...filter };

      if (newFilters.isFreeShip) delete newFilters.isFreeShip;
      else newFilters.isFreeShip = true;

      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => 'Promotion',
    isActive: () => true,
    isVisible: (filter) => filter.isPromotion,
    isRemovable: true,
    onRemove: (filter) => {
      const newFilters = { ...filter };

      delete newFilters.isPromotion;

      return newFilters;
    },
    onToggle: () => {},
  },
  //   {
  //     id: 3,
  //     getLabel: (filter) => 'Price',
  //     isActive: () => true,
  //     isVisible: (filter) =>
  //       Object.keys(filter).includes('salePrice_lte') && Object.keys(filter).includes('salePrice_gte'),
  //     isRemovable: true,
  //     onRemove: (filter) => {},
  //     onToggle: () => {},
  //   },
  {
    id: 4,
    getLabel: (filters) => `Category: ${filters['category.id']}`,
    isActive: () => true,
    isVisible: (filters) => filters['category.id'],
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters['category.id'];
      return newFilters;
    },
    onToggle: (filters) => {},
  },
];

function FilterViewer(props) {
  const { filter = {}, onChange } = props;
  const classes = useStyles();

  //re-render only when filter props change
  const visibleFilter = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filter));
  }, [filter]);

  return (
    <Box component="ul" className={classes.root}>
      {visibleFilter.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filter)}
            color={x.isActive(filter) ? 'primary' : 'default'}
            clickable={!x.isRemovable}
            size="small"
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;

                    const newFilters = x.onToggle(filter);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;

                    const newFilters = x.onRemove(filter);
                    onChange(newFilters);
                  }
                : null
            }
          ></Chip>
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
