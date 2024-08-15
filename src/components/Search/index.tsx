import React, { ChangeEventHandler } from 'react';
// @ts-ignore
import debounce from 'lodash.debounce';
import styles from './search.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../../redux/filter/selectors';
import { setInputSearch, setSearchValue } from '../../redux/filter/slice';

const Search = () => {
  const { inputSearch } = useSelector(selectFilter);

  const dispatch = useDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onSearch = (value: string) => {
    dispatch(setSearchValue(value));
  };

  const onClear = () => {
    onSearch('');
    dispatch(setInputSearch(''));
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      onSearch(str);
    }, 500),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputSearch(e.target.value));
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        fill="#000000"
        width="26px"
        height="26px"
        viewBox="0 0 24 24"
        id="search-alt-2"
        data-name="Line Color"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon}
      >
        <line
          id="secondary"
          x1={21}
          y1={21}
          x2={16.66}
          y2={16.66}
          style={{
            fill: 'none',
            stroke: '#fe5f1e',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 2,
          }}
        />
        <circle
          id="primary"
          cx={11}
          cy={11}
          r={8}
          style={{
            fill: 'none',
            stroke: '#232323',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 2,
          }}
        />
      </svg>
      <input
        ref={inputRef}
        value={inputSearch}
        onChange={e => onChangeInput(e)}
        className={styles.search}
        type="text"
        placeholder="Поиск пиццы..."
      />
      {inputSearch && (
        <svg
          onClick={onClear}
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 1792 1792"
          xmlSpace="preserve"
          className={styles.clear}
        >
          <path d="M1082.2,896.6l410.2-410c51.5-51.5,51.5-134.6,0-186.1s-134.6-51.5-186.1,0l-410.2,410L486,300.4 c-51.5-51.5-134.6-51.5-186.1,0s-51.5,134.6,0,186.1l410.2,410l-410.2,410c-51.5,51.5-51.5,134.6,0,186.1 c51.6,51.5,135,51.5,186.1,0l410.2-410l410.2,410c51.5,51.5,134.6,51.5,186.1,0c51.1-51.5,51.1-134.6-0.5-186.2L1082.2,896.6z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
