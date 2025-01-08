import React, { FC } from 'react';

import styles from './GridCell.module.css';

interface IProps {
  cellContent: string;
}

const GridCell: FC<IProps> = ({ cellContent }) => {
  return <span className={styles.cell}>{cellContent}</span>;
};

export default GridCell;