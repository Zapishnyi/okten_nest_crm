import React from 'react';
import styles from './Activate.module.css';
import ActivateForm from '../../forms/ActivateForm/ActivateForm';


const Activate = () => {
  return <div className={styles.wrapper}>
    <ActivateForm />
  </div>;
};

export default Activate;