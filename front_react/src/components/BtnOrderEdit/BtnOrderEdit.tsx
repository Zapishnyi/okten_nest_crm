import React, { FC } from 'react';

import IOrder from '../../interfaces/IOrder';
import { useAppSelector } from '../../redux/store';

import styles from './BtnOrderEdit.module.css';

interface IProps {
  order: IOrder;
}

const BtnOrderEdit: FC<IProps> = ({ order }) => {
  const { userLogged } = useAppSelector((state) => state.users);
  const order_ownership = userLogged?.id === order.manager_id || order.manager === null;
  return <button disabled={!order_ownership}
                 className={['button', !order_ownership ? styles.no_hover : ''].join(' ')}>Edit</button>;
};

export default BtnOrderEdit;