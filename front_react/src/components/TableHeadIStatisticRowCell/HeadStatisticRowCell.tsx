import React, { FC, memo } from 'react';

import styles from './HeadRowStatisticCell.module.css';


interface IProps {
  cellName: string;
}

const HeadStatisticRowCell: FC<IProps> = memo(({ cellName }) => {
  console.log('.');
  return <th className={styles.cell}>
    {cellName}
  </th>;
});

export default HeadStatisticRowCell;