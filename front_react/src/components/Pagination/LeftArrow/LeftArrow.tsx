import React, { FC } from 'react';
import styles from './LeftArrow.module.css';
import { useSearchParams } from 'react-router-dom';


const LeftArrow: FC = () => {
  const queryParams = useSearchParams();
  const currentPage = Number(queryParams[0].get('page'));
  const className = currentPage === 1 ? styles.not_active : '';
  const clickHandle = () => {
    if (currentPage !== 1) {
      const queryModified = {
        ...Object.fromEntries(queryParams[0].entries()),
        page: (currentPage - 1).toString(),
      };
      queryParams[1](queryModified);
    }
  };
  return (
    <div className={className} onClick={clickHandle}>
      <span> &lsaquo;</span>
    </div>
  );
};

export default LeftArrow;