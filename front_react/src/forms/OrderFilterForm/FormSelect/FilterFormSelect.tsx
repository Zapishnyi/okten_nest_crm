import React from 'react';

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import styles from './FilterFormSelect.module.css';


interface IProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  field_name: Path<T>;
  enum_type: Record<string, string>;
  not_selected_value: string;
  required?: boolean,
}

const FilterFormSelect = <T extends FieldValues>({
                                                   register,
                                                   field_name,
                                                   enum_type,
                                                   not_selected_value,
                                                   required,
                                                 }: IProps<T>) => {

  return (
    <select className={styles.select}  {...register(field_name, { required: required || true })}>
      {[not_selected_value, ...Object.values(enum_type)].map((item, i) =>
        <option key={i} value={!i ? '' : item}>{item}</option>)}
    </select>

  );
};

export default FilterFormSelect;