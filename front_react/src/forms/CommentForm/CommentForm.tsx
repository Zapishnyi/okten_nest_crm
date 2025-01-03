import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './CommentFrom.module.css';
import IOrder from '../../interfaces/IOrder';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { CRMApi } from '../../services/crm.api.servise';
import IComment from '../../interfaces/IComment';
import { OrdersActions } from '../../redux/Slices/ordersSlice';
import { useSearchParams } from 'react-router-dom';
import { errorHandle } from '../../helpers/error-handle';


interface IProps {
  order: IOrder;
}

const CommentForm: FC<IProps> = ({ order }) => {
  const { userLogged } = useAppSelector((state) => state.users);
  const { register, handleSubmit, reset } = useForm<IComment>();
  const order_ownership = userLogged?.id === order.manager_id || order.manager === null;

  const dispatch = useAppDispatch();
  const query = useSearchParams();

  useEffect(() => {
    reset();
  }, [query[0].toString()]);

  const submitHandle = async (formData: IComment) => {
    try {
      await CRMApi.orders.add_comment(order.id, formData);
      dispatch(OrdersActions.searchForOrders(Object.fromEntries(query[0].entries())));
      reset();
    } catch (e) {
      errorHandle(e);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandle)}>
      <fieldset disabled={!order_ownership}>
        <input type="text" {...register('comment')} placeholder={'Comment'} />
        <button className={['button', !order_ownership ? styles.no_hover : ''].join(' ')}>Submit</button>
      </fieldset>
    </form>
  );
};

export default CommentForm;