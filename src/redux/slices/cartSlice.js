import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
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

    minusProduct(state, action) {
      const findProduct = state.products.find(
        obj => obj.id === action.payload.id
      );
      if (findProduct) {
        findProduct.count--;
        state.totalPrice -= findProduct.price;
      }
    },

    removeProduct(state, action) {
      state.products = state.products.filter(
        item => item.id !== action.payload.id
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

export const selectCart = state => state.cartReducer;
export const selectCartItemById = id => state =>
  state.cartReducer.products.find(obj => obj.id === id);

export const { addProduct, removeProduct, clearProducts, minusProduct } =
  cartSlice.actions;

export default cartSlice.reducer;
