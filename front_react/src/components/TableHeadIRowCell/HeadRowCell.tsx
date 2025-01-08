import React, { ChangeEvent, FC, memo, MouseEvent, RefObject, useEffect } from 'react';

import { useLocation, useSearchParams } from 'react-router-dom';

import { SortEnum } from '../../enums/sort.enum';
import { sortToggle } from '../../helpers/sort-toggle';
import { tableReset } from '../../helpers/table-reset';

import styles from './HeadRowCell.module.css';


interface IProps {
  cellName: string;
  chosenColumnRef: RefObject<string>;
}

const HeadRowCell: FC<IProps> = memo(({ cellName, chosenColumnRef }) => {
  console.log('.');
  useEffect(() => {
    tableReset();
  }, []);

  const queryParams = useSearchParams();
  const location = useLocation();
  const changeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    const queryModified = {
      ...Object.fromEntries(queryParams[0].entries()),
      ...(location.pathname.includes('orders') ? { page: '1' } : {}),
      sortBy: event.currentTarget.value,
    };
    queryParams[1](queryModified);
  };

  const clickHandle = (event: MouseEvent<HTMLInputElement>) => {
    const sortUp = Array.from(document.getElementsByClassName(styles.up)) as HTMLParagraphElement[];
    const sortDown = Array.from(document.getElementsByClassName(styles.down)) as HTMLParagraphElement[];
    if (chosenColumnRef.current === event.currentTarget.value) {
      const queryModified = {
        ...Object.fromEntries(queryParams[0].entries()),
        ...(location.pathname.includes('orders') ? { page: '1' } : {}),
        sort: sortToggle((queryParams[0].get('sort')) as SortEnum),
      };
      queryParams[1](queryModified);
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