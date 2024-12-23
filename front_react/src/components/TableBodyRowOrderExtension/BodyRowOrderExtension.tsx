import React, { FC } from 'react';
import styles from './BodyRowOrderExtension.module.css';
import CommentForm from '../../forms/CommentForm/CommentForm';
import Comment from '../Comment/Comment';
import { useAppSelector } from '../../redux/store';

interface IProps {
  visibility: boolean;
  order_id: number;
}

const BodyRowOrderExtension: FC<IProps> = ({ visibility, order_id }) => {
  const { orders } = useAppSelector((state) => state.orders);
  const order = orders?.filter((order) => order.id === order_id)[0];
  return (
    <tr className={[visibility ? styles.visible : styles.not_visible, styles.row_extension].join(' ')}>
      <td colSpan={15}>
        <div className={styles.order_edit}>
          <div className={styles.message_container}>
            <p>Message: <span>{order.msg}</span></p>
            <p>UTM: <span>{order.utm}</span></p>
          </div>
          <div className={styles.edit_container}>
            <div className={styles.comments_part}>
              <div className={styles.comments}>
                {!!order.comments.length && order.comments.slice().reverse().map((comment, i) => <Comment key={i}
                                                                                                          comment={{ ...comment }} />)}
              </div>
              <CommentForm order={order} />
            </div>
            <div className={styles.btn_part}>
              <div className="button">Edit</div>
            </div>
          </div>
        </div>

        <div></div>
      </td>
    </tr>
  );
};

export default BodyRowOrderExtension;