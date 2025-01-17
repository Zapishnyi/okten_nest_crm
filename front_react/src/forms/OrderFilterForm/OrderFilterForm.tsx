import React, { FC } from 'react';

import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';

import { CourseFormatEnum } from '../../enums/course-format.enum';
import { CourseTypeEnum } from '../../enums/course-type.enum';
import { CourseEnum } from '../../enums/course.enum';
import { StatusEnum } from '../../enums/status.enum';
import IOrderEdit from '../../interfaces/IOrderEdit';
import orderEditValidator from '../../validators/order-edit.validator';

import FilterFormSelect from './FormSelect/FilterFormSelect';
import styles from './OrderFilterForm.module.css';

const OrderFilterForm: FC = () => {


  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } =
    useForm<IOrderEdit>({
      mode: 'all',
      resolver: joiResolver(orderEditValidator),
      // defaultValues: initialFormValue,
    });

  const formSubmit = async (formData: IOrderEdit) => {

  };


  return <form className={styles.form} onSubmit={handleSubmit(formSubmit)}>
    <input type="text" {...register('name')} placeholder={'Name'} />
    <input type="text" {...register('surname')} placeholder={'Surname'} />
    <input type="text" {...register('email')} placeholder={'Email'} />
    <input type="text" {...register('phone')} placeholder={'Phone'} />
    <input type="number" {...register('age')} placeholder={'Age'} />
    <FilterFormSelect register={register} field_name={'course'} enum_type={CourseEnum}
                      not_selected_value={'all courses'} />
    <FilterFormSelect register={register} field_name={'course_format'} enum_type={CourseFormatEnum}
                      not_selected_value={'all course formats'} />
    <FilterFormSelect register={register} field_name={'course_type'} enum_type={CourseTypeEnum}
                      not_selected_value={'all course types'} />
    <FilterFormSelect register={register} field_name={'status'} enum_type={StatusEnum}
                      not_selected_value={'all order statuses'} />
    <input type="text" {...register('group')} placeholder={'Group'} />
  </form>;


};

export default OrderFilterForm;