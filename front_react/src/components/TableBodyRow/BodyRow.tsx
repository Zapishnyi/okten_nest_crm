import React, { FC, useEffect, useState } from 'react';
import BodyRowCell from '../TableBodyRowCell/BodyRowCell';
import styles from './BodyRow.module.css';
import BodyRowOrderExtension from '../TableBodyRowOrderExtension/BodyRowOrderExtension';
import { useSearchParams } from 'react-router-dom';
import IOrderReduced from '../../interfaces/IOrderReduced';
import { TableTypeEnum } from '../../enums/table-type.enum';
import IUser from '../../interfaces/IUser';

interface IProps {
  item: IOrderReduced | IUser;
  table_type: TableTypeEnum;
}

const BodyRow: FC<IProps> = ({ item, table_type }) => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const query = useSearchParams();

  useEffect(() => {
    setVisibility(false);
  }, [query[0]]);

  const clickHandle = () => {
    setVisibility((current) => !current);
  };
  return <>
    <tr onClick={clickHandle} className={styles.order_row}>
      {Object.entries(item).map((cell, i) => <BodyRowCell key={i}
                                                          cell={[cell[0], String(cell[1])]} />)}
    </tr>
    {table_type === TableTypeEnum.ORDER && <BodyRowOrderExtension visibility={visibility} order_id={item.id} />}

  </>;
};

export default BodyRow;