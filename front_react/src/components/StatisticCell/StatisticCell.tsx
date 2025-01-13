import React, { FC } from 'react';

import styles from './StatisticCell.module.css';

interface IProps {
  cellContent: string;
}

const StatisticCell: FC<IProps> = ({ cellContent }) => {
  return <span className={styles.cell}>{cellContent}</span>;
};

export default StatisticCell;