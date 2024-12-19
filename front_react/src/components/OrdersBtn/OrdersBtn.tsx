import React, { FC, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './OrdersBtn.module.css';

const OrdersBtn: FC = () => {
  const query = useSearchParams();
  const [isChosen, setIsChosen] = useState<boolean>(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes('/orders')) {
      setIsChosen(true);
    } else {
      setIsChosen(false);
    }
  }, [query]);
  return (
    <div className={['button', isChosen ? styles.chosen : ''].join(' ')}>
      <p>Orders</p>
    </div>
  );
};

export default OrdersBtn;