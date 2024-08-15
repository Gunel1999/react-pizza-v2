import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { SortTypeType } from './filterSlice';

export type SearchPizzaParams = {
  sort: string;
  sortAsc: string;
  searchValue: string;
  categoryId: number;
  currentPage: number;
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  'pizzas/fetchPizzasStatus',
  async params => {
    const { currentPage, categoryId, sort, sortAsc, searchValue } = params;
    const res = await axios.get<PizzaItem[]>(
      `https://66b1fc321ca8ad33d4f602e5.mockapi.io/pizzas?page=${currentPage}&limit=4${
        categoryId ? `&category=${categoryId}` : ''
      }&sortBy=${sort}&order=${sortAsc}${
        searchValue ? `&search=${searchValue}` : ''
      }`
    );

    return res.data;
  }
);

type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPizzas.pending, state => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, state => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const selecPizzas = (state: RootState) => state.pizzasReducer;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
