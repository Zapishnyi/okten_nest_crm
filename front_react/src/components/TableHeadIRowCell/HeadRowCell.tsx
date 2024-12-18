import React, { ChangeEvent, FC, MouseEvent, MutableRefObject, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { sortToggle } from '../../helpers/sort-toggle';
import { SortEnum } from '../../enums/sort.enum';
import styles from './HeadRowCell.module.css';

interface IProps {
  cellName: string;
  chosenColumnRef: MutableRefObject<string>;
}

const HeadRowCell: FC<IProps> = ({ cellName, chosenColumnRef }) => {
  console.log('.');
  useEffect(() => {
    const radio = document.getElementsByName('orderBy') as NodeListOf<HTMLInputElement>;
    radio.forEach(e => {
      if (e.value === 'id') {
        e.checked = true;
      }
    });
  }, []);

  const queryParams = useSearchParams();

  const changeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    const queryModified = {
      ...Object.fromEntries(queryParams[0].entries()),
      page: '1',
      sortBy: event.currentTarget.value,
    };
    queryParams[1](queryModified);
  };

  const clickHandle = (event: MouseEvent<HTMLInputElement>) => {
    const sortUp = Array.from(document.getElementsByClassName(styles.up)) as HTMLParagraphElement[];
    const sortDown = Array.from(document.getElementsByClassName(styles.down)) as HTMLParagraphElement[];
    if (chosenColumnRef.current === event.currentTarget.value) {
      const queryModified = {
        ...Object.fromEntries(queryParams[0].entries()), page: '1',
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
             value={cellName} name={'orderBy'} /> {cellName}
      <p className={styles.up}>{'\u25BE'}</p>
      <p className={[styles.down, styles.visible].join(' ')}>{'\u25B4'}</p>
    </label>
  </th>;
};

export default HeadRowCell;