import React, { ChangeEvent, FC, memo, MouseEvent, RefObject, useEffect } from 'react';

import { useLocation, useSearchParams } from 'react-router-dom';

import { SortEnum } from '../../../enums/sort.enum';
import { sortToggle } from '../../../helpers/sort-toggle';
import { tableReset } from '../../../helpers/table-reset';

import styles from './HeadRowCell.module.css';


interface IProps {
  cellName: string;
  chosenColumnRef: RefObject<string>;
}

const HeadRowCell: FC<IProps> = memo(({ cellName, chosenColumnRef }) => {
  // console.log('.');
  const location = useLocation();
  useEffect(() => {
    tableReset();
  }, []);

  const [query, setQuery] = useSearchParams();
  const changeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    const queryModified = {
      ...((location.pathname === '/orders') ? { page: '1' } : {}),
      sortBy: event.currentTarget.value,
    };
    for (const [key, value] of Object.entries(queryModified)) {
      query.delete(key);
      if (value) {
        query.append(key, value.toString());
      }
    }
    setQuery(query);
  };

  const clickHandle = (event: MouseEvent<HTMLInputElement>) => {
    const sortUp = Array.from(document.getElementsByClassName(styles.up)) as HTMLParagraphElement[];
    const sortDown = Array.from(document.getElementsByClassName(styles.down)) as HTMLParagraphElement[];
    if (chosenColumnRef.current === event.currentTarget.value) {
      const queryModified = {
        ...((location.pathname === '/orders') ? { page: '1' } : {}),
        sort: sortToggle((query.get('sort')) as SortEnum),
      };
      for (const [key, value] of Object.entries(queryModified)) {
        query.delete(key);
        if (value) {
          query.append(key, value.toString());
        }
      }
      setQuery(query);
      sortUp.forEach(e => e.classList.toggle(styles.visible));
      sortDown.forEach(e => e.classList.toggle(styles.visible));
    }
    chosenColumnRef.current = event.currentTarget.value;
  };
  return <th className={[styles[cellName], styles.cell].join(' ')}>
    <label>
      <input className={'title'} onClick={clickHandle} onChange={changeHandle} type="radio"
             value={cellName} name={'orderBy'} />
      {cellName}
      <p className={styles.up}>{'\u25BE'}</p>
      <p className={styles.down}>{'\u25B4'}</p>
    </label>
  </th>;
});

export default HeadRowCell;