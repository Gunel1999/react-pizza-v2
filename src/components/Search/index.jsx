import React from 'react';
import styles from './search.module.scss';
import { SearchContext } from '../../App';

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);
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
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        className={styles.search}
        type="text"
        placeholder="Поиск пиццы..."
      />
      {searchValue && (
        <svg
          onClick={() => setSearchValue('')}
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
