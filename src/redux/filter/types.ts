export enum SortPropertyEnum {
  RATING = 'rating',
  TITLE = 'title',
  PRICE = 'price',
}
export type SortTypeType = {
  name: string;
  sort: SortPropertyEnum;
};

export type SortAscType = 'asc' | 'desc';

export interface FilterSliceState {
  categoryId: number;
  currentPage: number;
  sortType: SortTypeType;
  sortAsc: SortAscType;
  searchValue: string;
  inputSearch: string;
}
