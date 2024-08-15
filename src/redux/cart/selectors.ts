import { RootState } from '../store';

export const selectCart = (state: RootState) => state.cartReducer;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cartReducer.products.find(obj => obj.id === id);
