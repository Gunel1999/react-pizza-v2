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
  const sort = sortType.sort;
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = id => {
    dispatch(setCategoryId(id));
  };

  const onChangeAsc = i => {
    dispatch(setSortAsc(i));
  };

  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    setIsLoading(true);
    axios
      .get(
        `https://66b1fc321ca8ad33d4f602e5.mockapi.io/pizzas?page=${currentPage}&limit=4${
          categoryId ? `&category=${categoryId}` : ''
        }&sortBy=${sort}&order=${sortAsc}${
          searchValue ? `&search=${searchValue}` : ''
        }`
      )
      .then(res => {
        setPizzas(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setPizzas([]);
        setIsLoading(false);
      });
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
      isSearch.current = true;
    }
  }, []);

  // если был первый рендер то запрашиваем пиццы
  React.useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
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

  const pizzaItems = pizzas.map(pizza => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));

  const skeletons = [...new Array(pizzaItems.length)].map((_, index) => (
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
      <div className="content__items">{isLoading ? skeletons : pizzaItems}</div>
      <Pagination
        currentPage={currentPage}
        onChangePage={number => onChangePage(number)}
      />
    </div>
  );
};

export default Home;
