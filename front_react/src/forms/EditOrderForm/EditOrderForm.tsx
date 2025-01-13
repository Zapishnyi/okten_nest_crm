import React, { FC, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import BtnLoader from '../../components/BtnLoader/BtnLoader';
import ErrorsContainer from '../../components/ErrorsContainer/ErrorsContainer';
import FormDropDownInput from '../../components/FormDropDownInput/FormDropDownInput';
import FormInput from '../../components/FormInput/FormInput';
import FormSelect from '../../components/FormSelect/FormSelect';
import { CourseFormatEnum } from '../../enums/course-format.enum';
import { CourseTypeEum } from '../../enums/course-type.enum';
import { CourseEnum } from '../../enums/course.enum';
import { InputFieldTypeEnum } from '../../enums/input-field-type.enum';
import { StatusEnum } from '../../enums/status.enum';
import { errorHandle } from '../../helpers/error-handle';
import { IItemActionResponse } from '../../interfaces/IItemActionResponse';
import IOrderEdit from '../../interfaces/IOrderEdit';
import { VisibilityActions } from '../../redux/Slices/visabilitySlice';
import { useAppDispatch } from '../../redux/store';
import { CRMApi } from '../../services/crm.api.servise';
import styles from '../Form.module.css';


const EditOrderForm: FC = () => {
  const [errorMessage, setErrorMassage] = useState<string[] | null>(null);
  const dispatch = useAppDispatch();
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [isPending, setIsPending] = useState(false);
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<IOrderEdit>({
    mode: 'all',
    // resolver: joiResolver(),
  });
  const formSubmit = async (formData: IOrderEdit) => {

    //   try {
    //     await CRMApi.admin.create_user(formData);
    //     dispatch(UsersActions.getAllUsers(Object.fromEntries(query[0].entries())));
    //     setOrderEditFormVisible(false);
    //     setErrorMassage(null);
    //   } catch (e) {
    //     setErrorMassage(errorHandle(e).message);
    //   }
  };
  const [groups, setGroups] = useState<string[]>([]);

  const closeForm = () => {
    dispatch(VisibilityActions.editOrderFormVisible(false));

  };
  // Group names get and set logic
  useEffect(() => {
    const groupsFetch = async () => {
      setLoadingState(true);
      try {
        setGroups((await CRMApi.groups.get_all()).map(e => e.name));
      } catch (e) {
        errorHandle(e);
      } finally {
        setLoadingState(false);
      }

    };
    void groupsFetch();
  }, []);
  const addItemAction = async (value: string): Promise<IItemActionResponse> => {
    setLoadingState(true);
    try {
      const newGroup = await CRMApi.groups.create_group({ name: value });
      setGroups(current => [...current, newGroup.name]);
      return { itemName: newGroup.name, error: [] };
    } catch (e) {
      return { itemName: null, error: errorHandle(e).message };
    } finally {
      setLoadingState(false);
    }
  };


  return <form className={styles.form} onSubmit={handleSubmit(formSubmit)}>
    <div className={styles.inputs}>
      <FormDropDownInput<IOrderEdit>
        register={register}
        field_name={'group'}
        field_label={'Group'}
        items={groups}
        addItemAction={addItemAction}
        error={errors.group?.message}
        loadingState={loadingState}
      />

      <FormInput<IOrderEdit>
        register={register}
        field_name={'name'}
        field_label={'Name'}
        field_type={InputFieldTypeEnum.TEXT}
        error={errors.name?.message}
      />
      <FormInput<IOrderEdit>
        register={register}
        field_name={'surname'}
        field_label={'Surname'}
        field_type={InputFieldTypeEnum.TEXT}
        error={errors.surname?.message}
      />
      <FormInput<IOrderEdit>
        register={register}
        field_name={'email'}
        field_label={'Email'}
        field_type={InputFieldTypeEnum.TEXT}
        error={errors.email?.message}
      />
      <FormInput<IOrderEdit>
        register={register}
        field_name={'phone'}
        field_label={'Phone'}
        field_type={InputFieldTypeEnum.TEXT}
        error={errors.phone?.message}
      />
      <FormInput<IOrderEdit>
        register={register}
        field_name={'age'}
        field_label={'Age'}
        field_type={InputFieldTypeEnum.NUMBER}
        error={errors.age?.message}
      />
      <FormSelect<IOrderEdit>
        register={register}
        field_name={'status'}
        field_label={'Status'}
        enum_type={StatusEnum}
      />
      <FormInput<IOrderEdit>
        register={register}
        field_name={'sum'}
        field_label={'Sum'}
        field_type={InputFieldTypeEnum.NUMBER}
        error={errors.sum?.message}
      />
      <FormInput<IOrderEdit>
        register={register}
        field_name={'alreadyPaid'}
        field_label={'Already paid'}
        field_type={InputFieldTypeEnum.NUMBER}
        error={errors.alreadyPaid?.message}
      />
      <FormSelect<IOrderEdit>
        register={register}
        field_name={'course'}
        field_label={'Course'}
        enum_type={CourseEnum}
      />
      <FormSelect<IOrderEdit>
        register={register}
        field_name={'course_format'}
        field_label={'Course format'}
        enum_type={CourseFormatEnum}
      />
      <FormSelect<IOrderEdit>
        register={register}
        field_name={'course_type'}
        field_label={'Course type'}
        enum_type={CourseTypeEum}
      />
    </div>

    <div className={styles.buttons}>
      <button className="button" disabled={!isValid}>
        Submit
        {isPending && <BtnLoader loadingState={isPending} />}</button>
      <div className="button" onClick={closeForm}>
        <span>Cancel</span>
      </div>
    </div>
    {errorMessage?.length && <ErrorsContainer errors={errorMessage} />}
  </form>;


};

export default EditOrderForm;