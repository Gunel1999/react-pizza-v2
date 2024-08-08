import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sort: 'rating',
  });
  const [sortAsc, setSortAsc] = React.useState('asc');

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://66b1fc321ca8ad33d4f602e5.mockapi.io/pizzas?${
        categoryId ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sort}&order=${sortAsc}`
    )
      .then(res => res.json())
      .then(json => {
        setPizzas(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortAsc]);

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
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
};

export default Home;
