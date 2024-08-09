import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../pagination';
import { SearchContext } from '../App';

const Home = () => {
  const { searchValue } = React.useContext(SearchContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sort: 'rating',
  });
  const [sortAsc, setSortAsc] = React.useState('asc');
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://66b1fc321ca8ad33d4f602e5.mockapi.io/pizzas?page=${currentPage}&limit=4${
        categoryId ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sort}&order=${sortAsc}${
        searchValue ? `&search=${searchValue}` : ''
      }`
    )
      .then(res => res.json())
      .then(json => {
        setPizzas(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortAsc, searchValue, currentPage]);

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
          onClickCategory={i => setCategoryId(i)}
        />
        <Sort
          value={sortType}
          onChangeSort={i => setSortType(i)}
          asc={sortAsc}
          onChangeAsc={i => setSortAsc(i)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzaItems}</div>
      <Pagination onChangePage={number => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
