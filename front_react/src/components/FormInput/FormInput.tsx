import React, { useState } from 'react';

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { SvgEyeClosed } from '../SvgEyeClosed/SvgEyeClosed';
import { SvgEyeOpen } from '../SvgEyeOpen/SvgEyeOpen';

import styles from './FormInput.module.css';


interface IProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  field_name: Path<T>;
  field_label: string;
  isPassword?: boolean;
  error?: string;
}

const FormInput = <T extends FieldValues>({
                                            register,
                                            field_name,
                                            isPassword = false,
                                            field_label,
                                            error,
                                          }: IProps<T>) => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(!isPassword);
  return (
    <label className={styles.label}>
      {field_label}:{' '}
      <input
        type={passwordVisibility ? 'text' : 'password'}
        autoComplete="on"
        {...register(field_name)}
      />
      {!!error && <p>{error}</p>}
      {isPassword &&
        <div
          className={styles.eye}
          onClick={() => setPasswordVisibility(current => !current)}
        >
          {passwordVisibility ? <SvgEyeClosed /> : <SvgEyeOpen />}
        </div>}

    </label>
  );
};

export default FormInput;