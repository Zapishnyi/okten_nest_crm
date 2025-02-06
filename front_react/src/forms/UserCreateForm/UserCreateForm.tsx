import { FC, useState } from "react";

import { joiResolver } from "@hookform/resolvers/joi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import BtnLoader from "../../components/BtnLoader/BtnLoader";
import ErrorsContainer from "../../components/ErrorsContainer/ErrorsContainer";
import FormInput from "../../components/FormInput/FormInput";
import { InputFieldTypeEnum } from "../../enums/input-field-type.enum";
import { errorHandle } from "../../helpers/error-handle";
import { IUserCreate } from "../../interfaces/IUserCreate";
import { UsersActions } from "../../redux/Slices/usersSlice";
import { VisibilityActions } from "../../redux/Slices/visibilitySlice";
import { useAppDispatch } from "../../redux/store";
import { CRMApi } from "../../services/crm.api.service";
import userCreateValidator from "../../validators/user-create.validator";
import styles from "../Form.module.css";

const UserCreateForm: FC = () => {
  const [errorMessage, setErrorMassage] = useState<string[] | null>(null);
  const dispatch = useAppDispatch();
  const query = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IUserCreate>({
    mode: "all",
    resolver: joiResolver(userCreateValidator),
  });
  const closeForm = () => {
    dispatch(VisibilityActions.createUserFormVisible(false));
  };
  const [isPending, setIsPending] = useState<boolean>(false);
  const formSubmit: SubmitHandler<IUserCreate> = async (formData) => {
    setIsPending(true);
    try {
      await CRMApi.admin.create_user(formData);
      dispatch(
        UsersActions.getAllUsers(Object.fromEntries(query[0].entries()))
      );
      closeForm();
      setErrorMassage(null);
    } catch (e) {
      setErrorMassage(errorHandle(e).message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(formSubmit)}>
      <FormInput<IUserCreate>
        register={register}
        field_name={"name"}
        field_label={"Name"}
        field_type={InputFieldTypeEnum.TEXT}
        error={errors.name?.message}
      />
      <FormInput<IUserCreate>
        register={register}
        field_name={"surname"}
        field_label={"Surname"}
        field_type={InputFieldTypeEnum.TEXT}
        error={errors.surname?.message}
      />
      <FormInput<IUserCreate>
        register={register}
        field_name={"email"}
        field_label={"Email"}
        field_type={InputFieldTypeEnum.TEXT}
        error={errors.email?.message}
      />
      <div className={styles.buttons}>
        <button className="button" disabled={!isValid}>
          Submit
          {isPending && <BtnLoader loadingState={isPending} />}
        </button>
        <div className="button" onClick={() => closeForm()}>
          <span>Cancel</span>
        </div>
      </div>
      {errorMessage?.length && <ErrorsContainer errors={errorMessage} />}
    </form>
  );
};

export default UserCreateForm;
