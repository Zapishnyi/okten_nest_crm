import React, { FC } from 'react';
import styles from './withButtonWrapper.module.css';

export const withButtonWrapper = (Component: FC) => {
  return () => {
    return (
      <div className={styles.button}>
        <Component />
      </div>
    );
  };
};

