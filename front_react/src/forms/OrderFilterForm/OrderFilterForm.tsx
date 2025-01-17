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


  return <form onSubmit={handleSubmit(formSubmit)}>
    <input type="text" {...register('name')} />
    <input type="text" {...register('surname')} />
    <input type="text" {...register('email')} />
    <input type="text" {...register('phone')} />
    <input type="number" {...register('age')} />
    <FilterFormSelect register={register} field_name={'course'} enum_type={CourseEnum}
                      not_selected_value={'all courses'} />
    <FilterFormSelect register={register} field_name={'course_format'} enum_type={CourseFormatEnum}
                      not_selected_value={'all course formats'} />
    <FilterFormSelect register={register} field_name={'course_type'} enum_type={CourseTypeEnum}
                      not_selected_value={'all course types'} />
    <FilterFormSelect register={register} field_name={'status'} enum_type={StatusEnum}
                      not_selected_value={'all order statuses'} />
    <input type="text" {...register('group')} />
  </form>;


};

export default OrderFilterForm;