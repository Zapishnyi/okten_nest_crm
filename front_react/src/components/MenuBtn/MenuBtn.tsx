import React, { FC } from 'react';
import styles from './MenuBtn.module.css';

const MenuBtn: FC = () => {
  const clickHandle = () => {
    const menuBar = document.getElementById('menu-bar') as HTMLDivElement;
    menuBar.classList.add('lower');
  };
  return (
    <div className={styles.button} onClick={clickHandle}>
      <p> Menu</p>
    </div>
  );
};

export default MenuBtn;