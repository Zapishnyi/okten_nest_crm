import React, { FC, useEffect } from 'react';

import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import IComment from '../../interfaces/IComment';
import IOrder from '../../interfaces/IOrder';
import { OrdersActions } from '../../redux/Slices/ordersSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import commentValidator from '../../validators/comment.validator';

import styles from './CommentFrom.module.css';


interface IProps {
  order: IOrder;
}

const CommentForm: FC<IProps> = ({ order }) => {
  const { userLogged } = useAppSelector((state) => state.users);
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<IComment>({
    mode: 'onChange',
    resolver: joiResolver(commentValidator),
  });
  const order_ownership = userLogged?.id === order.manager_id || order.manager === null;

  const dispatch = useAppDispatch();
  const query = useSearchParams();

  useEffect(() => {
    reset();
  }, [query[0].toString()]);

  const submitHandle = async (formData: IComment) => {
    if (formData.comment.length) {
      dispatch(OrdersActions.addComment({ order_id: order.id, comment: formData }));
      reset();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandle)}>
      <fieldset disabled={!order_ownership}>
        <input type="text" {...register('comment')} placeholder={'Comment'} />
        <button disabled={!isValid} className={['button', !order_ownership ? styles.no_hover : ''].join(' ')}>Submit
        </button>
        {!!errors.comment?.message && <p>{errors.comment.message}</p>}
      </fieldset>
    </form>
  );
};

export default CommentForm;