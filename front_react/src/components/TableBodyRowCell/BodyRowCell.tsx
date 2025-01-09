import React, { FC } from 'react';

import styles from './BodyRowCell.module.css';

interface IProps {
  cell: [string, string];
}

const BodyRowCell: FC<IProps> = ({ cell }) => {
  return <td title={cell[1]} className={[styles.cell, styles[cell[0]]].join(' ')}>{cell[1]}</td>;
};

export default BodyRowCell;