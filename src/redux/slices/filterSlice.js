import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sortType: {
    name: 'популярности',
    sort: 'rating',
  },
  sortAsc: 'asc',
  searchValue: '',
  inputSearch: '',
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

    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },

    setInputSearch(state, action) {
      state.inputSearch = action.payload;
    },

    setFilters(state, action) {
      state.sortType = action.payload.sortType;
      state.sortAsc = action.payload.sortAsc;
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.searchValue = action.payload.searchValue;
      state.inputSearch = action.payload.inputSearch;
    },
  },
});

export const {
  setCategoryId,
  setSortType,
  setSortAsc,
  setCurrentPage,
  setSearchValue,
  setFilters,
  setInputSearch,
} = filterSlice.actions;
export default filterSlice.reducer;
