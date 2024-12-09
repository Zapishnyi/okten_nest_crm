import React, { FC } from 'react';
import IOrder from '../../interfaces/IOrder';
import BodyRowCell from '../TableBodyRowCell/BodyRowCell';

interface IProps {
  order: IOrder;
}

const BodyRow: FC<IProps> = ({ order }) => {
  const date = new Date(order.created_at);
  const orderDataCorrected = { ...order, created_at: date.toLocaleString('en-GB') };
  return <tr>{Object.values(orderDataCorrected).map((cell, i) => <BodyRowCell key={i} cell={cell} />)}</tr>;
};

export default BodyRow;