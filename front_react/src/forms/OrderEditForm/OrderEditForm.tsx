import React, { FC, useEffect, useState } from 'react';

import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';

import BtnLoader from '../../components/BtnLoader/BtnLoader';
import FormDropDownInput from '../../components/FormDropDownInput/FormDropDownInput';
import FormInput from '../../components/FormInput/FormInput';
import FormSelect from '../../components/FormSelect/FormSelect';
import { CourseFormatEnum } from '../../enums/course-format.enum';
import { CourseTypeEnum } from '../../enums/course-type.enum';
import { CourseEnum } from '../../enums/course.enum';
import { InputFieldTypeEnum } from '../../enums/input-field-type.enum';
import { StatusEnum } from '../../enums/status.enum';
import IOrder from '../../interfaces/IOrder';
import IOrderEdit from '../../interfaces/IOrderEdit';
import { GroupsActions } from '../../redux/Slices/groupsSlice';
import { OrdersActions } from '../../redux/Slices/ordersSlice';
import { VisibilityActions } from '../../redux/Slices/visabilitySlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import orderEditValidator from '../../validators/order-edit.validator';
import styles from '../Form.module.css';

const OrderEditForm: FC = () => {


  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { chosenOrder, ordersLoadingState } = useAppSelector((state) => state.orders);
  const { groupsLoadingState, groups } = useAppSelector(state => state.groups);
  const { utm, manager, msg, id, comments, manager_id, created_at, ...restValues } = chosenOrder as IOrder;
  const initialFormValue = restValues as IOrderEdit;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } =
    useForm<IOrderEdit>({
      mode: 'all',
      resolver: joiResolver(orderEditValidator),
      defaultValues: initialFormValue,
    });

  const formSubmit = async (formData: IOrderEdit) => {
    const filteredData: IOrderEdit = {};
    for (const [key, value] of Object.entries(formData)) {
      if (value && (initialFormValue[key as keyof IOrderEdit] !== value)) {
        filteredData[key as keyof IOrderEdit] = value;
      }
    }
    if (chosenOrder) {
      dispatch(OrdersActions.editOrder({
        order_id: chosenOrder.id,
        orderEdited: filteredData,
      }));
    }
    dispatch(VisibilityActions.editOrderFormVisible(false));
  };

  const closeForm = () => {
    dispatch(VisibilityActions.editOrderFormVisible(false));
  };

  // Group names get and set logic
  useEffect(() => {
    dispatch(GroupsActions.getGroups());
  }, []);
  const addItemAction = (value: string): void => {
    dispatch(GroupsActions.addGroup({ name: value }));
  };

  return <form className={styles.form} onSubmit={handleSubmit(formSubmit)}>
    <div className={styles.inputs}>
      <FormDropDownInput<IOrderEdit>
        register={register}
        field_name={'group'}
        field_label={'Group'}
        items={groups}
        addItemAction={addItemAction}
        loadingState={groupsLoadingState}
        setFormIsValid={setFormIsValid}
        error={errors.group?.message}
        required={false}
      />

      <FormInput<IOrderEdit>
        register={register}
        field_name={'name'}
        field_label={'Name'}
        field_type={InputFieldTypeEnum.TEXT}
        error={errors.name?.message}
        required={false}
      />
      <FormInput<IOrderEdit>
        register={register}
        field_name={'surname'}
        field_label={'Surname'}
        field_type={InputFieldTypeEnum.TEXT}
        error={errors.surname?.message}
        required={false}
      />
      <FormInput<IOrderEdit>
        register={register}
        field_name={'email'}
        field_label={'Email'}
        field_type={InputFieldTypeEnum.TEXT}
        error={errors.email?.message}
        required={false}
      />
      <FormInput<IOrderEdit>
        register={register}
        field_name={'phone'}
        field_label={'Phone'}
        field_type={InputFieldTypeEnum.TEXT}
        error={errors.phone?.message}
        required={false}
      />
      <FormInput<IOrderEdit>
        register={register}
        field_name={'age'}
        field_label={'Age'}
        field_type={InputFieldTypeEnum.NUMBER}
        error={errors.age?.message}
        required={false}
      />
      <FormSelect<IOrderEdit>
        register={register}
        field_name={'status'}
        field_label={'Status'}
        enum_type={StatusEnum}
        required={false}
      />
      <FormInput<IOrderEdit>
        register={register}
        field_name={'sum'}
        field_label={'Sum'}
        field_type={InputFieldTypeEnum.NUMBER}
        error={errors.sum?.message}
        required={false}
      />
      <FormInput<IOrderEdit>
        register={register}
        field_name={'alreadyPaid'}
        field_label={'Already paid'}
        field_type={InputFieldTypeEnum.NUMBER}
        error={errors.alreadyPaid?.message}
        required={false}
      />
      <FormSelect<IOrderEdit>
        register={register}
        field_name={'course'}
        field_label={'Course'}
        enum_type={CourseEnum}
        required={false}
      />
      <FormSelect<IOrderEdit>
        register={register}
        field_name={'course_format'}
        field_label={'Course format'}
        enum_type={CourseFormatEnum}
        required={false}
      />
      <FormSelect<IOrderEdit>
        register={register}
        field_name={'course_type'}
        field_label={'Course type'}
        enum_type={CourseTypeEnum}
        required={false}
      />
    </div>

    <div className={styles.buttons}>
      <button className="button" disabled={!isValid || !formIsValid || groupsLoadingState}>
        Submit
        {ordersLoadingState && <BtnLoader loadingState={ordersLoadingState} />}</button>
      <div className="button" onClick={closeForm}>
        <span>Cancel</span>
      </div>
    </div>
    {/*{errorMessage?.length && <ErrorsContainer errors={errorMessage} />}*/}
  </form>;


};

export default OrderEditForm;