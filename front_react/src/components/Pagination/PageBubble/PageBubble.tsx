import React, { FC } from 'react';

import { useSearchParams } from 'react-router-dom';

import styles from './PageBubble.module.css';


interface IProps {
  page: string;

}

const PageBubble: FC<IProps> = ({ page }) => {
  const queryParams = useSearchParams();
  const className = [page === '...' ? styles.non_click : '', page === queryParams[0].get('page') ? styles.current_page : ''].join(' ');
  const clickHandle = () => {
    if (page !== '...') {
      const queryModified = {
        ...Object.fromEntries(queryParams[0].entries()),
        page: page,
      };
      queryParams[1](queryModified);
    }
  };
  return (
    <div className={className}
         onClick={clickHandle}>
      <p>{page}</p>
    </div>
  );
};

export default PageBubble;