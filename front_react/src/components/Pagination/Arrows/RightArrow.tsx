import React, { FC } from 'react';

import { useSearchParams } from 'react-router-dom';

import styles from './Arrow.module.css';

interface IProps {
  pages: number;

}

const RightArrow: FC<IProps> = ({ pages }) => {
  const queryParams = useSearchParams();
  const currentPage = Number(queryParams[0].get('page'));
  const className = [currentPage === pages ? styles.not_active : ''].join(' ');
  const clickHandle = () => {
    if (currentPage !== pages) {
      const queryModified = {
        ...Object.fromEntries(queryParams[0].entries()),
        page: (currentPage + 1).toString(),
      };
      queryParams[1](queryModified);
    }
  };
  return (
    <div className={className} onClick={clickHandle}>
      <span>&rsaquo;</span>
    </div>
  );
};

export default RightArrow;