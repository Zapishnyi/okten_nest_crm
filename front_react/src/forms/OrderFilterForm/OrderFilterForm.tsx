import React, { FC, useCallback, useEffect, useRef } from 'react';

import { debounce } from 'lodash';
import { useForm } from 'react-hook-form';
import { useLocation, useSearchParams } from 'react-router-dom';

import { SvgCheck } from '../../components/SvgCheck/SvgCheck';
import { CourseFormatEnum } from '../../enums/course-format.enum';
import { CourseTypeEnum } from '../../enums/course-type.enum';
import { CourseEnum } from '../../enums/course.enum';
import { StatusEnum } from '../../enums/status.enum';
import { IOrderFilterQuery } from '../../interfaces/IOrderFilterQuery';

import FilterFormGroupSelect from './FormGroupSelect/FilterFormGroupSelect';
import FilterFormSelect from './FormSelect/FilterFormSelect';
import styles from './OrderFilterForm.module.css';

const defaultValues: IOrderFilterQuery = {
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
  upper_date: null,
  lower_date: null,
};

const OrderFilterForm: FC = () => {
  const location = useLocation();
  const [query, setQuery] = useSearchParams();

  const {
    register,
    watch,
    reset,
  } =
    useForm<IOrderFilterQuery>({
      defaultValues,
    });
  const firstRender = useRef<boolean>(true);
  useEffect(() => {
    if (location.search === '?sort=DESC&page=1&sortBy=id') {
      reset();
    }

  }, [query.toString()]);


  const debouncedFormSubmitHandler = useCallback(
    debounce(
      (formData: IOrderFilterQuery) => {
        for (const [key, value] of Object.entries(formData)) {
          query.delete(key);
          if (value) {
            query.append(key, value);
          }
        }
        if (!firstRender.current) {
          setQuery(query);
        } else {
          firstRender.current = false;
        }
      }, 800),
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
    <input className={styles.form_item} type="text" {...register('name', { required: false })} placeholder={'Name'} />
    <input className={styles.form_item} type="text" {...register('surname', { required: false })}
           placeholder={'Surname'} />
    <input className={styles.form_item} type="text" {...register('email', { required: false })} placeholder={'Email'} />
    <input className={styles.form_item} type="text" {...register('phone', { required: false })} placeholder={'Phone'} />
    <input className={styles.form_item} type="number" {...register('age', { required: false })} placeholder={'Age'} />
    <input className={styles.form_item} type="date" {...register('lower_date', { required: false })}
           title={'Search after this date...'} />

    <label className={`${styles.my_order}  ${styles.form_item}`}><SvgCheck
      className={[styles.check, watch().my_orders ? styles.check_show : ''].join(' ')} /><span>My orders</span>
      <input
        type="checkbox" {...register('my_orders')} /></label>
    <FilterFormSelect register={register} field_name={'course'} enum_type={CourseEnum}
                      not_selected_value={'all courses'} required={false} />
    <FilterFormSelect register={register} field_name={'course_format'}
                      enum_type={CourseFormatEnum}
                      not_selected_value={'all course formats'} required={false} />
    <FilterFormSelect register={register} field_name={'course_type'}
                      enum_type={CourseTypeEnum}
                      not_selected_value={'all course types'} required={false} />
    <FilterFormSelect register={register} field_name={'status'} enum_type={StatusEnum}
                      not_selected_value={'all order statuses'} required={false} />
    <FilterFormGroupSelect register={register} field_name={'group'} required={false} />
    <input className={styles.form_item} type="date" {...register('upper_date', { required: false })}
           title={'Search before this date...'} />
    <div onClick={formReset} className={`${styles.reset} ${styles.form_item}`}><p>Reset</p></div>
  </form>;


};

export default OrderFilterForm;