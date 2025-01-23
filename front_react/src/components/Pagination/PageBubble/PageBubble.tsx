import { FC } from 'react';


import { useSearchParams } from 'react-router-dom';

import styles from './PageBubble.module.css';


interface IProps {
  page: string;
  pages: number;

}

const PageBubble: FC<IProps> = ({ page, pages }) => {
  const [query, setQuery] = useSearchParams();
  const className = [page === '...' ? styles.non_click : '', page === query.get('page') ? styles.current_page : ''].join(' ');
  const clickHandle = () => {
    if (page !== '...' && pages > 1) {
      const queryModified = {
        page: page,
      };
      for (const [key, value] of Object.entries(queryModified)) {
        query.delete(key);
        if (value) {
          query.append(key, value);
        }
      }
      setQuery(query);
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