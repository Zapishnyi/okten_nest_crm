import React, { useEffect } from 'react';

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { GroupsActions } from '../../../redux/Slices/groupsSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

import styles from './FilterFormGroupSelect.module.css';


interface IProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  field_name: Path<T>;
  required?: boolean,
}

const FilterFormGroupSelect = <T extends FieldValues>({
                                                        register,
                                                        field_name,
                                                        required,
                                                      }: IProps<T>) => {
  const dispatch = useAppDispatch();
  const { groups, groupsLoadingState } = useAppSelector(state => state.groups);
  const { orders } = useAppSelector(state => state.orders);
  useEffect(() => {
    dispatch(GroupsActions.getGroups());
  }, [orders]);

  return (

    <div className={styles.select}>
      <select  {...register(field_name, { required: required || true })} >
        {['all groups', ...groups].map((item, i) =>
          <option key={i} value={!i ? '' : item}>{item}</option>)}

      </select>
      {/*{groupsLoadingState && <div className={styles.loader}>*/}
      {/*  <BarLoader />*/}
      {/*</div>}*/}

    </div>


  );
};

export default FilterFormGroupSelect;