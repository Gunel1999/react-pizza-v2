import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async params => {
    const { currentPage, categoryId, sort, sortAsc, searchValue } = params;
    const res = await axios.get(
      `https://66b1fc321ca8ad33d4f602e5.mockapi.io/pizzas?page=${currentPage}&limit=4${
        categoryId ? `&category=${categoryId}` : ''
      }&sortBy=${sort}&order=${sortAsc}${
        searchValue ? `&search=${searchValue}` : ''
      }`
    );

    return res.data;
  }
);

const initialState = {
  items: [],
  status: 'loading',
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPizzas.pending, state => {
        state.items = [];
        state.status = 'loading';
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, state => {
        state.items = [];
        state.status = 'error';
      });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
