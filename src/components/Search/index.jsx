import React from 'react';
import styles from './search.module.scss';

const Search = () => {
  return (
    <div className={styles.root}>
      <input
        className={styles.search}
        type="text"
        placeholder="Поиск пиццы..."
      />
      <svg
        fill="#000000"
        width="30px"
        height="30px"
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
    </div>
  );
};

export default Search;
