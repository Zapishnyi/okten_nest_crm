import React, { useRef } from 'react';

import { TableType } from '../../types/TableType';

import styles from './Table.module.css';
import BodyRow from './TableBodyRow/BodyRow';
import HeadRowCell from './TableHeadRowCell/HeadRowCell';


interface IProps<T> {
  items: T[];
}

const Table = <T extends TableType>({ items }: IProps<T>) => {
  const chosenColumnRef = useRef<string>('id');
  const titles = Object.keys(items[0] || {});
  return <table className={styles.table} border={1}>
    <thead>
    <tr>
      {titles.map((e, i) => <HeadRowCell key={i} cellName={e}
                                         chosenColumnRef={chosenColumnRef} />)}
    </tr>
    </thead>
    <tbody>
    {!!items.length && items
      .map((item, i) => <BodyRow<T> key={i} item={item} />)}
    </tbody>
  </table>;
};

export default Table;