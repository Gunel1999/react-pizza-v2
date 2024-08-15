import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
  RATING = 'rating',
  TITLE = 'title',
  PRICE = 'price',
}
export type SortTypeType = {
  name: string;
  sort: SortPropertyEnum;
};

type SortAscType = 'asc' | 'desc';

export interface FilterSliceState {
  categoryId: number;
  currentPage: number;
  sortType: SortTypeType;
  sortAsc: SortAscType;
  searchValue: string;
  inputSearch: string;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  sortType: {
    name: 'популярности',
    sort: SortPropertyEnum.RATING,
  },
  sortAsc: 'asc',
  searchValue: '',
  inputSearch: '',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<SortTypeType>) {
      state.sortType = action.payload;
    },
    setSortAsc(state, action: PayloadAction<SortAscType>) {
      state.sortAsc = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },

    setInputSearch(state, action: PayloadAction<string>) {
      state.inputSearch = action.payload;
    },

    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sortType = action.payload.sortType;
      state.sortAsc = action.payload.sortAsc;
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.searchValue = action.payload.searchValue;
      state.inputSearch = action.payload.inputSearch;
    },
  },
});

export const selectSortType = (state: RootState) =>
  state.filterReducer.sortType;
export const selectFilter = (state: RootState) => state.filterReducer;

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
