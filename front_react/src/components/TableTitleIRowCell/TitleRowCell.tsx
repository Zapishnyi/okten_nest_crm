import React, { FC, MouseEvent, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import IFormData from '../../interfaces/IOrderFormData';

interface IProps {
  cellName: string;
  register: UseFormRegister<IFormData>;
  formSubmit: () => void;
}

const TitleRowCell: FC<IProps> = ({ cellName, register, formSubmit }) => {
  console.log('.');
  const [chosenColumn, setChosenColumn] = useState<string>('id');
  const clickHandle = (event: MouseEvent<HTMLInputElement>) => {
    const orderElement = document.getElementById('order') as HTMLInputElement | null;

    if (chosenColumn === event.currentTarget.value && !!orderElement) {
      orderElement.checked = !orderElement.checked;
    }
    setChosenColumn(event.currentTarget.value);

    formSubmit();
  };
  return <th>
    <label>
      <input className={'title'} onClick={clickHandle} type="radio"
             value={cellName} {...register('orderBy')} /> {cellName}

    </label>
  </th>;
};

export default TitleRowCell;