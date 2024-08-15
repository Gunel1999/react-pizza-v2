import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};
interface CartSliceState {
  totalPrice: number;
  products: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<CartItem>) {
      const findProduct = state.products.find(
        obj => obj.id === action.payload.id
      );

      if (findProduct) {
        findProduct.count++;
      } else {
        state.products.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.products.reduce(
        (sum, product) => product.price * product.count + sum,
        0
      );
    },

    plusProduct(state, action: PayloadAction<string>) {
      const findProduct = state.products.find(obj => obj.id === action.payload);
      if (findProduct) {
        findProduct.count++;
        state.totalPrice += findProduct.price;
      }
    },

    minusProduct(state, action: PayloadAction<string>) {
      const findProduct = state.products.find(obj => obj.id === action.payload);
      if (findProduct) {
        findProduct.count--;
        state.totalPrice -= findProduct.price;
      }
    },

    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        item => item.id !== action.payload
      );

      state.totalPrice = state.products.reduce(
        (sum, product) => product.price * product.count + sum,
        0
      );
    },

    clearProducts(state) {
      state.products = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cartReducer;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cartReducer.products.find(obj => obj.id === id);

export const {
  addProduct,
  plusProduct,
  removeProduct,
  clearProducts,
  minusProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
