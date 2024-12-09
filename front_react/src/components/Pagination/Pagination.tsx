import React, { FC } from 'react';
import LeftArrow from './LeftArrow/LeftArrow';
import RightArrow from './RightArrow/RightArrow';

interface IProps {
  page: number;
  pages: number;
  total: number;
  limit: number;
}

const Pagination: FC<IProps> = ({ page, pages, total }) => {

  return (
    <div>
      {page > 1 && <LeftArrow />}

      {page < pages && <RightArrow />}
    </div>
  );
};

export default Pagination;