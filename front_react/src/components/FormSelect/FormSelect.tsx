import React from 'react';

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import styles from './FormSelect.module.css';


interface IProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  field_name: Path<T>;
  field_label: string;
  enum_type: Record<string, string>;
  error?: string;
  required?: boolean;

}

const FormSelect = <T extends FieldValues>({
                                             register,
                                             field_name,
                                             field_label,
                                             error,
                                             enum_type,
                                             required,
                                           }: IProps<T>) => {

  return (
    <label className={styles.label}>
      {field_label}:{' '}
      <select  {...register(field_name, { required: required || true })}>
        {Object.values(enum_type).map((item, i) =>
          <option key={i} value={item}>{item}</option>,
        )

        }
      </select>
      {!!error && <p>{error}</p>}
    </label>
  );
};

export default FormSelect;