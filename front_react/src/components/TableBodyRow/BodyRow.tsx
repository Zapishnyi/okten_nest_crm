import React, { FC } from 'react';
import IOrder from '../../interfaces/IOrder';
import BodyRowCell from '../TableBodyRowCell/BodyRowCell';
import { orderToReduced } from '../../helpers/order-to-reduced';

interface IProps {
  order: IOrder;
}

const BodyRow: FC<IProps> = ({ order }) => {
  const date = new Date(order.created_at);
  const orderDataCorrected = { ...orderToReduced(order), created_at: date.toLocaleDateString('en-GB') };
  return <tr>{Object.values(orderDataCorrected).map((cell, i) => <BodyRowCell key={i} cell={cell} />)}</tr>;
};

export default BodyRow;