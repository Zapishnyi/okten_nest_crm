import React, { Dispatch, FC } from 'react';

import styles from './DropDownItem.module.css';

interface IProps {
  name: string;
  setItemChosen: Dispatch<string>;
  setListVisibility: Dispatch<boolean>;
  dropDownInput: HTMLInputElement;
}

const DropDownItem: FC<IProps> = ({ name, dropDownInput, setItemChosen, setListVisibility }) => {


  const clickHandle = () => {
    setItemChosen(name);
    setListVisibility(false);
  };
  return <p className={styles.item_name} onClick={clickHandle}>{name}</p>;
};

export default DropDownItem;