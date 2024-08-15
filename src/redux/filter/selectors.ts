import { RootState } from '../store';

export const selectSortType = (state: RootState) =>
  state.filterReducer.sortType;
export const selectFilter = (state: RootState) => state.filterReducer;
