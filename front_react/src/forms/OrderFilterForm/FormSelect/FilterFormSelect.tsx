import React from 'react';

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';


interface IProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  field_name: Path<T>;
  enum_type: Record<string, string>;
  not_selected_value: string;
}

const FilterFormSelect = <T extends FieldValues>({
                                                   register,
                                                   field_name,
                                                   enum_type,
                                                   not_selected_value,
                                                 }: IProps<T>) => {

  return (
    <select  {...register(field_name)}>
      {[not_selected_value, ...Object.values(enum_type)].map((item, i) =>
        <option key={i} value={item}>{item}</option>)}
    </select>

  );
};

export default FilterFormSelect;