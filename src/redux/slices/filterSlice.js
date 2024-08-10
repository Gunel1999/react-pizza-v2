import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sortType: {
    name: 'популярности',
    sort: 'rating',
  },
  sortAsc: 'asc',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setSortAsc(state, action) {
      state.sortAsc = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSortType, setSortAsc, setCurrentPage } =
  filterSlice.actions;
export default filterSlice.reducer;
