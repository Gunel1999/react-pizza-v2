import { CartItem } from '../redux/cart/types';

export const calcTotalPrice = (products: CartItem[]) => {
  return products.reduce(
    (sum, product) => product.price * product.count + sum,
    0
  );
};
