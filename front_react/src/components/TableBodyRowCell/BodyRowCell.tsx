import React, { FC } from 'react';

type Props<T> = {
  cell: T;
}

const BodyRowCell: FC<Props<any>> = ({ cell }) => {
  
  return <td>{cell}</td>;
};

export default BodyRowCell;