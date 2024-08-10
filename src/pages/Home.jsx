import React from 'react';
import axios from 'axios';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../pagination';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCategoryId,
  setSortAsc,
  setCurrentPage,
} from '../redux/slices/filterSlice';

const Home = () => {
  const { categoryId, sortType, sortAsc, currentPage } = useSelector(
    state => state.filterReducer
  );
  const sort = sortType.sort;
  const dispatch = useDispatch();

  const { searchValue } = React.useContext(SearchContext);
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

  React.useEffect(() => {
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
      <h2 className="content__title">
        {pizzas.length ? 'Все пиццы' : '😢 По вашему запросу ничего не найдено'}
      </h2>
      <div className="content__items">{isLoading ? skeletons : pizzaItems}</div>
      <Pagination
        currentPage={currentPage}
        onChangePage={number => onChangePage(number)}
      />
    </div>
  );
};

export default Home;
