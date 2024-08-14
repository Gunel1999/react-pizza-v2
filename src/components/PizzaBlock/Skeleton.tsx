import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <div className="pizza-block-wrapper">
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={500}
      viewBox="0 0 280 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="-3" y="270" rx="10" ry="10" width="270" height="25" />
      <rect x="-3" y="315" rx="10" ry="10" width="270" height="85" />
      <rect x="1" y="433" rx="10" ry="10" width="90" height="30" />
      <rect x="124" y="425" rx="20" ry="20" width="143" height="45" />
      <circle cx="130" cy="120" r="118" />
    </ContentLoader>
  </div>
);

export default Skeleton;
