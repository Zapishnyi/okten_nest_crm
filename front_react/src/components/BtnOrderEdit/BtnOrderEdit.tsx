import React, { FC } from 'react';

import IOrder from '../../interfaces/IOrder';
import { OrdersActions } from '../../redux/Slices/ordersSlice';
import { VisibilityActions } from '../../redux/Slices/visabilitySlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './BtnOrderEdit.module.css';

interface IProps {
  order: IOrder;
}

const BtnOrderEdit: FC<IProps> = ({ order }) => {
  const dispatch = useAppDispatch();
  const { userLogged } = useAppSelector((state) => state.users);
  const order_ownership = userLogged?.id === order.manager_id || order.manager === null;

  const clickHandle = () => {
    dispatch(OrdersActions.setChosenOrder(order));
    dispatch(VisibilityActions.editOrderFormVisible(true));
  };

  return <button disabled={!order_ownership}
                 className={['button', !order_ownership ? styles.no_hover : ''].join(' ')}
                 onClick={clickHandle}>Edit</button>;
};

export default BtnOrderEdit;