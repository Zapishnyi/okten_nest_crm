import { useState } from "react";

import { FieldValues, Path, UseFormRegister } from "react-hook-form";

import { InputFieldTypeEnum } from "../../enums/input-field-type.enum";
import { SvgEyeClosed } from "../SvgEyeClosed/SvgEyeClosed";
import { SvgEyeOpen } from "../SvgEyeOpen/SvgEyeOpen";

import styles from "./FormInput.module.css";

interface IProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  field_name: Path<T>;
  field_label: string;
  field_type: InputFieldTypeEnum;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

const FormInput = <T extends FieldValues>({
  register,
  field_name,
  field_type,
  field_label,
  required,
  error,
  placeholder,
}: IProps<T>) => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(
    field_type !== InputFieldTypeEnum.PASSWORD
  );
  const type =
    field_type === InputFieldTypeEnum.PASSWORD
      ? passwordVisibility
        ? InputFieldTypeEnum.TEXT
        : InputFieldTypeEnum.PASSWORD
      : field_type;
  const eRestrictHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === "e" ||
        e.key === "E" ||
        e.key === "+" ||
        e.key === "-" ||
        e.key === ".") &&
      type === InputFieldTypeEnum.NUMBER
    ) {
      e.preventDefault();
    }
  };
  return (
    <label className={styles.label}>
      {field_label}:{" "}
      <input
        onKeyDown={eRestrictHandle}
        type={type}
        autoComplete="on"
        placeholder={placeholder}
        {...register(field_name, { required: required || true })}
      />
      {!!error && <p>{error}</p>}
      {field_type === InputFieldTypeEnum.PASSWORD && (
        <div
          className={styles.eye}
          onClick={() => setPasswordVisibility((current) => !current)}
        >
          {passwordVisibility ? <SvgEyeClosed /> : <SvgEyeOpen />}
        </div>
      )}
    </label>
  );
};

export default FormInput;
