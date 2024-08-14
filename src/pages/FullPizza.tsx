import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://66b1fc321ca8ad33d4f602e5.mockapi.io/pizzas/${id}`
        );
        setPizza(data);
      } catch (error) {
        console.error(error);
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt={pizza.title} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
