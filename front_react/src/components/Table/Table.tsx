import React, { FC, useRef } from 'react';
import HeadRowCell from '../TableHeadIRowCell/HeadRowCell';
import BodyRow from '../TableBodyRow/BodyRow';
import styles from './Table.module.css';
import IOrderReduced from '../../interfaces/IOrderReduced';
import IUser from '../../interfaces/IUser';
import { TableTypeEnum } from '../../enums/table-type.enum';

interface IProps {
  items: IOrderReduced[] | IUser[];
  table_type: TableTypeEnum;
}

const Table: FC<IProps> = ({ items, table_type }) => {

  const chosenColumnRef = useRef<string>('id');
  const titles = Object.keys(items[0]);
  return <table className={styles.table} border={1}>
    <thead>
    <tr>
      {titles.map((e, i) => <HeadRowCell key={i} cellName={e}
                                         chosenColumnRef={chosenColumnRef} />)}
    </tr>
    </thead>
    <tbody>
    {!!items.length && items.map((item, i) => <BodyRow key={i} item={item} table_type={table_type} />)}
    </tbody>
  </table>;
};

export default Table;