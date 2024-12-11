import React, { FC, useEffect, useState } from 'react';
import LeftArrow from './LeftArrow/LeftArrow';
import RightArrow from './RightArrow/RightArrow';
import styles from './Pagination.module.css';
import PageBubble from './PageBubble/PageBubble';

interface IProps {
  page: number;
  pages: number;
}

const Pagination: FC<IProps> = ({ page, pages }) => {
  console.log('.');
  const [pagination, setPagination] = useState<string[]>([]);

  useEffect(() => {
    const pageLimit = (pages / 2) < 3.5 ? Math.floor(pages / 2) : 3;
    const pagesToShowLeft = pages > 7 ? 7 : pages;
    const pagesToShowRight = pages > 6 ? 6 : pages - 1;
    let paginationScheme: string[] = [];
    let output: string[];
    const findPageLeft = (pageN: number): number => {
      const check = pageN - pageLimit;
      return check < 1 ? findPageLeft(++pageN) : check;
    };
    const findPageRight = (pageN: number, pagesN: number): number => {
      const check = pageN + pageLimit;
      return check > pagesN ? findPageRight(--pageN, pagesN) : check;
    };
    if (page <= pages / 2) {
      for (let i = findPageLeft(page); i < findPageLeft(page) + pagesToShowLeft; ++i) {
        paginationScheme.push(i.toString());
      }
      switch (true) {
        case pages > 7 && pages === 8 :
          output = paginationScheme.concat([pages.toString()]);
          break;
        case pages > 7 :
          output = paginationScheme.concat(['...', pages.toString()]);
          break;
        default :
          output = paginationScheme;
      }
    } else {
      switch (true) {
        case pages > 7 && pages === 8 :
          output = paginationScheme.concat(['1']);
          break;
        case pages > 7 :
          output = paginationScheme.concat(['1', '...']);
          break;
        default :
          output = paginationScheme;
      }
      for (let i = findPageRight(page, pages) - pagesToShowRight; i <= findPageRight(page, pages); ++i) {
        output.push(i.toString());
      }
    }
    setPagination(output);
  }, [page, pages]);
  return (
    <div className={styles.wrapper}>
      <LeftArrow />
      {pagination.map((mark, i) => <PageBubble key={i} page={mark} />)}
      <RightArrow pages={pages} />
    </div>
  );
};

export default Pagination;