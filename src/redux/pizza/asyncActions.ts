import { createAsyncThunk } from '@reduxjs/toolkit';
import { PizzaItem, SearchPizzaParams } from './types';
import axios from 'axios';

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
