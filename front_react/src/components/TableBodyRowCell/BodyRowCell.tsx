import React, { FC } from 'react';
import styles from './BodyRowCell.module.css';

type Props<T> = {
  cell: [string, T];
}

const BodyRowCell: FC<Props<string | number>> = ({ cell }) => {
  return <td className={[styles.cell, styles[cell[0]]].join(' ')}>{cell[1]}</td>;
};

export default BodyRowCell;