import React from 'react';
import qs from 'qs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../pagination';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCategoryId,
  setSortAsc,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

const Home = () => {
  const navigate = useNavigate();
  const {
    categoryId,
    sortType,
    sortAsc,
    currentPage,
    searchValue,
    inputSearch,
  } = useSelector(state => state.filterReducer);
  const { items, status } = useSelector(state => state.pizzasReducer);
  const sort = sortType.sort;
  const dispatch = useDispatch();
  const isMounted = React.useRef(false);

  const onChangeCategory = id => {
    dispatch(setCategoryId(id));
  };

  const onChangeAsc = i => {
    dispatch(setSortAsc(i));
  };

  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    dispatch(
      fetchPizzas({
        currentPage,
        categoryId,
        sort,
        sortAsc,
        searchValue,
      })
    );

    window.scrollTo(0, 0);
  };

  // если был первый рендер то проверяем URL-параметры и сохраняем в редакс
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find(obj => obj.sort === params.sortType);

      dispatch(
        setFilters({
          ...params,
          sort: sort || list[0],
        })
      );
    }
  }, []);

  // если был первый рендер то запрашиваем пиццы
  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort, sortAsc, searchValue, currentPage]);

  // Если изменили параметры и был рендер то вшиваем URL-параметры
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage,
        sortAsc,
        searchValue,
        inputSearch,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort, sortAsc, searchValue, currentPage]);

  const pizzaItems = items.map(pizza => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={i => onChangeCategory(i)}
        />
        <Sort asc={sortAsc} onChangeAsc={i => onChangeAsc(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'loading'
          ? skeletons
          : status === 'error'
          ? 'Произошла ошибка'
          : pizzaItems}
      </div>
      <Pagination
        currentPage={currentPage}
        onChangePage={number => onChangePage(number)}
      />
    </div>
  );
};

export default Home;
