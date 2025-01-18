import React, { FC, useCallback, useEffect } from 'react';

import { debounce } from 'lodash';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { SvgCheck } from '../../components/SvgCheck/SvgCheck';
import { CourseFormatEnum } from '../../enums/course-format.enum';
import { CourseTypeEnum } from '../../enums/course-type.enum';
import { CourseEnum } from '../../enums/course.enum';
import { StatusEnum } from '../../enums/status.enum';
import { IOrderFilterQuery } from '../../interfaces/IOrderFilterQuery';

import FilterFormSelect from './FormSelect/FilterFormSelect';
import styles from './OrderFilterForm.module.css';

const defaultValues = {
  age: null,
  course: null,
  course_format: null,
  course_type: null,
  email: null,
  group: null,
  my_orders: false,
  name: null,
  phone: null,
  status: null,
  surname: null,
};

const OrderFilterForm: FC = () => {
  const [query, setQuery] = useSearchParams();
  const {
    register,
    watch,
    reset,
  } =
    useForm<IOrderFilterQuery>({
      defaultValues,
    });
  useEffect(() => {
    reset();
  }, []);

  const debouncedFormSubmitHandler = useCallback(
    debounce(
      (formData: IOrderFilterQuery) => {
        for (const [key, value] of Object.entries(formData)) {
          query.delete(key);
          if (value) {
            query.append(key, value);
          }
        }
        setQuery(query);
      }, 500),
    [],
  );
  useEffect(() => {
    debouncedFormSubmitHandler(watch());
    return () => {
      debouncedFormSubmitHandler.cancel();
    };
  }, [JSON.stringify(watch())]);

  const formReset = () => {
    reset();
  };

  return <form className={styles.form}>
    <input type="text" {...register('name', { required: false })} placeholder={'Name'} />
    <input type="text" {...register('surname', { required: false })} placeholder={'Surname'} />
    <input type="text" {...register('email', { required: false })} placeholder={'Email'} />
    <input type="text" {...register('phone', { required: false })} placeholder={'Phone'} />
    <input type="number" {...register('age', { required: false })} placeholder={'Age'} />
    <label><SvgCheck
      className={[styles.check, watch().my_orders ? styles.check_show : ''].join(' ')} /><span>My orders</span>
      <input
        type="checkbox" {...register('my_orders')} /></label>
    <FilterFormSelect register={register} field_name={'course'} enum_type={CourseEnum}
                      not_selected_value={'all courses'} required={false} />
    <FilterFormSelect register={register} field_name={'course_format'} enum_type={CourseFormatEnum}
                      not_selected_value={'all course formats'} required={false} />
    <FilterFormSelect register={register} field_name={'course_type'} enum_type={CourseTypeEnum}
                      not_selected_value={'all course types'} required={false} />
    <FilterFormSelect register={register} field_name={'status'} enum_type={StatusEnum}
                      not_selected_value={'all order statuses'} required={false} />
    <input type="text" {...register('group', { required: false })} placeholder={'Group'} />
    <div onClick={formReset}><p>Reset</p></div>
  </form>;


};

export default OrderFilterForm;