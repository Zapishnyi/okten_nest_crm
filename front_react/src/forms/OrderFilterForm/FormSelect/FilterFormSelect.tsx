import React from 'react';

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';


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
    <select  {...register(field_name, { required: required || true })}>
      {[not_selected_value, ...Object.values(enum_type)].map((item, i) =>
        <option key={i} value={i - 1 ? '' : item}>{item}</option>)}
    </select>

  );
};

export default FilterFormSelect;