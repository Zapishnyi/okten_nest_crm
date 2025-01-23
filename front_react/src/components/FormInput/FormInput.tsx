import { useState } from 'react';

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { InputFieldTypeEnum } from '../../enums/input-field-type.enum';
import { SvgEyeClosed } from '../SvgEyeClosed/SvgEyeClosed';
import { SvgEyeOpen } from '../SvgEyeOpen/SvgEyeOpen';

import styles from './FormInput.module.css';


interface IProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  field_name: Path<T>;
  field_label: string;
  field_type: InputFieldTypeEnum;
  error?: string;
  required?: boolean;
}

const FormInput = <T extends FieldValues>({
                                            register,
                                            field_name,
                                            field_type,
                                            field_label,
                                            required,
                                            error,
                                          }: IProps<T>) => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(field_type !== InputFieldTypeEnum.PASSWORD);
  const type =
    field_type === InputFieldTypeEnum.PASSWORD
      ? passwordVisibility
        ? InputFieldTypeEnum.TEXT : InputFieldTypeEnum.PASSWORD
      : field_type;
  return (
    <label className={styles.label}>
      {field_label}:{' '}
      <input
        type={type}
        autoComplete="on"
        {...register(field_name, { required: required || true })}
      />
      {!!error && <p>{error}</p>}
      {field_type === InputFieldTypeEnum.PASSWORD &&
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