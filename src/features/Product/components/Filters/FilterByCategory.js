import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Text, Typography } from '@material-ui/core';
import categoryApi from 'api/categoryApi';
import CategorySkeleton from './CategorySkeleton';

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',

    '& > li': {
      marginTop: theme.spacing(1),
      transition: 'all .25s',

      '&:hover': {
        color: theme.palette.primary.main,
        cursor: 'pointer',
      },
    },
  },
}));

function FilterByCategory(props) {
  const { onChange } = props;
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();

        setCategoryList(
          list.map((category) => ({
            id: category.id,
            name: category.name,
          }))
        );
      } catch (error) {
        console.log('Fail', error);
      }
      setLoading(false);
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (onChange) onChange(category.id);
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>
      {loading ? (
        <CategorySkeleton />
      ) : (
        <ul className={classes.menu}>
          {categoryList.map((category) => (
            <li key={category.id} onClick={() => handleCategoryClick(category)}>
              <Typography variant="body2">{category.name}</Typography>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
}

export default FilterByCategory;
