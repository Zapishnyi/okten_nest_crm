import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { TableType } from '../../../types/TableType';

import styles from './BodyRow.module.css';
import BodyRowCell from './TableBodyRowCell/BodyRowCell';
import BodyRowOrderExtension from './TableBodyRowOrderExtension/BodyRowOrderExtension';
import BodyRowUserExtension from './TableBodyRowUserExtension/BodyRowUserExtension';


interface IProps<T> {
  item: T;
}

const BodyRow = <T extends TableType>({ item }: IProps<T>) => {
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
      {Object.entries(item || {}).map((cell, i) => <BodyRowCell key={i}
                                                                cell={[cell[0], String(cell[1])]} />)}
    </tr>
    {!!item && 'manager' in item && <BodyRowOrderExtension visibility={visibility} order_id={item.id} />}
    {!!item && 'role' in item && <BodyRowUserExtension visibility={visibility} user_id={item.id} />}

  </>;
};

export default BodyRow;