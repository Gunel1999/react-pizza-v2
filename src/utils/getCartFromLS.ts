import { CartItem } from '../redux/cart/types';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const json = data ? JSON.parse(data) : [];

  return {
    products: json as CartItem[],
    totalPrice: calcTotalPrice(json),
  };
};
