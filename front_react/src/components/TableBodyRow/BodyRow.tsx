import React, { FC, useState } from 'react';
import IOrder from '../../interfaces/IOrder';
import BodyRowCell from '../TableBodyRowCell/BodyRowCell';
import { orderToReduced } from '../../helpers/order-to-reduced';
import styles from './BodyRow.module.css';
import BodyRowExtension from '../TableBodyRowExtension/BodyRowExtention';

interface IProps {
  order: IOrder;
}

const BodyRow: FC<IProps> = ({ order }) => {
  const date = new Date(order.created_at);
  const orderDataCorrected = { ...orderToReduced(order), created_at: date.toLocaleDateString('en-GB') };
  const [visibility, setVisibility] = useState<boolean>(false);
  const clickHandle = () => {
    setVisibility((current) => !current);
  };
  return <>
    <tr onClick={clickHandle} className={styles.order_row}>
      {Object.entries(orderDataCorrected).map((cell, i) => <BodyRowCell key={i}
                                                                        cell={cell} />)}
    </tr>
    <BodyRowExtension visibility={visibility} order={order} />
  </>;
};

export default BodyRow;