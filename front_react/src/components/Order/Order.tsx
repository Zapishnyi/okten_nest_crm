import React, { FC } from 'react';
import IOrder from '../../interfaces/IOrder';

interface IProps {
  order: IOrder[];
}

const Order: FC<IProps> = ({ order }) => {
  
  return (
    <div></div>
  );
};

export default Order;