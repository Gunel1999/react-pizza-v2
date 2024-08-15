import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../pagination';
import { useSelector } from 'react-redux';
import filterSlice, {
  setCategoryId,
  setSortAsc,
  setCurrentPage,
  setFilters,
  selectFilter,
} from '../redux/slices/filterSlice';
import {
  fetchPizzas,
  SearchPizzaParams,
  selecPizzas,
} from '../redux/slices/pizzasSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const {
    categoryId,
    sortType,
    sortAsc,
    currentPage,
    searchValue,
    inputSearch,
  } = useSelector(selectFilter);
  const { items, status } = useSelector(selecPizzas);
  const sort = sortType.sort;
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangeAsc = React.useCallback((i: 'asc' | 'desc') => {
    dispatch(setSortAsc(i));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
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
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams;
      const sortValue = list.find(obj => obj.sort === params.sort);

      dispatch(
        setFilters({
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          sortType: sortValue || list[0],
          sortAsc: params.sortAsc === 'asc' ? 'asc' : 'desc',
          searchValue: params.searchValue,
          inputSearch: params.searchValue,
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

  const pizzaItems = items.map((pizza: any) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort asc={sortAsc} onChangeAsc={onChangeAsc} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>Попробуйте перезагрузить страницу</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzaItems}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        onChangePage={number => onChangePage(number)}
      />
    </div>
  );
};

export default Home;
