import React from 'react';

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { InputFieldTypeEnum } from '../../enums/input-field-type.enum';


interface IProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  field_name: Path<T>;
  placeholder: string;
  field_type: InputFieldTypeEnum;
  error?: string;
}

const FormFilterInput = <T extends FieldValues>({
                                                  register,
                                                  field_name,
                                                  field_type,
                                                  placeholder,
                                                  error,
                                                }: IProps<T>) => {

  return <></>;
  // <label className={styles.label}>
  //   {field_label}:{' '}
  //   <input
  //     type={type}
  //     autoComplete="on"
  //     {...register(field_name)}
  //   />
  //   {!!error && <p>{error}</p>}
  //   {field_type === InputFieldTypeEnum.PASSWORD &&
  //     <div
  //       className={styles.eye}
  //       onClick={() => setPasswordVisibility(current => !current)}
  //     >
  //       {passwordVisibility ? <SvgEyeClosed /> : <SvgEyeOpen />}
  //     </div>}
  //
  // </label>
  // );
};

export default FormFilterInput;