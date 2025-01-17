import React, { Dispatch, useEffect, useState } from 'react';

import { input } from '@testing-library/user-event/event/input';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';

import { groupValidator } from '../../validators/group.validator';
import { SvgArrowDownDropDown } from '../SvgArrowDownDropDown/SgArrowDownDropDown';
import { SvgArrowUpDropDown } from '../SvgArrowUpDropDown/SvgArrowUpDropDown';
import { SvgCross } from '../SvgCross/SvgCross';
import { SvgPlus } from '../SvgPlus/SvgPlus';

import DropDownItem from './DropDownItem/DropDownItem';
import styles from './FormDropDownInput.module.css';

interface IProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  field_name: Path<T>;
  field_label: string;
  items: string[];
  addItemAction: (value: string) => void;
  loadingState: boolean;
  setFormIsValid: Dispatch<boolean>;
  error?: string;
  required?: boolean;
}

const FormDropDownInput = <T extends FieldValues>({
                                                    field_label,
                                                    field_name,
                                                    error,
                                                    register,
                                                    items,
                                                    addItemAction,
                                                    setFormIsValid,
                                                    loadingState,
                                                    required,
                                                  }: IProps<T>) => {
  const [listVisibility, setListVisibility] = useState<boolean>(false);
  const [itemChosen, setItemChosen] = useState<string>('');
  const dropDownInput = document.getElementsByClassName(styles.drop_down_input)[0] as HTMLInputElement;
  const [addItemVisibility, setAddItemVisibility] = useState<boolean>(false);
  const [groupError, setGroupError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (dropDownInput) {
      dropDownInput.readOnly = true;
    }
  }, [items]);

  useEffect(() => {
    if (dropDownInput) {
      if (itemChosen === 'add new item...') {
        dropDownInput.value = '';
        dropDownInput.readOnly = false;
        const event = new Event('input', { bubbles: true, cancelable: true });
        dropDownInput.dispatchEvent(event);
      } else {
        dropDownInput.value = itemChosen;
        dropDownInput.readOnly = true;
      }
    }
    setFormIsValid(true);
    // setGroupError(undefined);
  }, [itemChosen]);

  const [mouseOver, setMouseOver] = useState<boolean>(false);

  useEffect(() => {
    const handleBlur = () => {
      if (!mouseOver) {
        setListVisibility(false);
      }
    };
    if (dropDownInput) {
      dropDownInput.addEventListener('blur', handleBlur);
    }
    return () => {
      if (dropDownInput) {
        dropDownInput.removeEventListener('blur', handleBlur);
      }
    };
  }, [mouseOver]);

  const addItem = () => {
    const currentValue = dropDownInput.value;
    addItemAction(currentValue);
    setItemChosen(currentValue);
    setListVisibility(false);
  };

  const validate = () => {
    const currentValue = dropDownInput.value;
    if (currentValue) {
      setFormIsValid(false);
      setAddItemVisibility(true);
    } else {
      setFormIsValid(true);
      setAddItemVisibility(false);
    }

    setGroupError(groupValidator.validate(currentValue).error?.message);
  };

  const clearInput = () => {
    setItemChosen('');
  };
 
  return (
    <label className={styles.label}>
      {field_label}:{' '}
      <input className={styles.drop_down_input}
             onInput={validate}
             type="text"
             autoComplete="on"
             {...register(field_name, { required: required || true })}
      />
      {!!error && <p>{error}</p>}
      {!!groupError && itemChosen === 'add new item...' && <p>{groupError}</p>}
      <div className={styles.control_buttons}>
        {loadingState && <ClipLoader size={18} />}
        {(itemChosen === 'add new item...') && addItemVisibility && !groupError && !loadingState &&
          <div className={styles.svg_base} title={'Add item'} onClick={addItem}>
            <SvgPlus />
          </div>}
        {(itemChosen !== 'add new item...') && itemChosen && !loadingState &&
          <div className={styles.svg_base} title={'Clear'} onClick={clearInput}>
            <SvgCross />
          </div>}
        <div className={styles.svg_base} onClick={() => setListVisibility(current => !current)}>
          {listVisibility ? <SvgArrowUpDropDown /> : <SvgArrowDownDropDown />}
        </div>
      </div>
      {listVisibility &&
        <div className={styles.drop_down}
             onMouseEnter={() => setMouseOver(true)}
             onMouseLeave={() => setMouseOver(false)}>
          {['add new item...', ...items].map((e, i) =>
            <DropDownItem key={i} name={e} setItemChosen={setItemChosen}
                          setListVisibility={setListVisibility}
                          dropDownInput={dropDownInput}
            />)}
        </div>}
    </label>
  );
};

export default FormDropDownInput;